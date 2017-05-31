'use strict';
const os = require('os');
const exec = require('child_process').exec;

const calculaCore = (newCore, oldCore, index) => new Promise((resolve, reject) => {
  let totalN = newCore.times.user + newCore.times.nice + newCore.times.sys + newCore.times.idle + newCore.times.irq;
  let userAvg = newCore.times.user - oldCore.times.user;
  let niceAvg = newCore.times.nice - oldCore.times.nice;
  let sysAvg = newCore.times.sys - oldCore.times.sys;
  let idleAvg = newCore.times.idle - oldCore.times.idle;
  let irqAvg = newCore.times.irq - oldCore.times.irq;
  let totalOld = oldCore.times.total || oldCore.times.user + oldCore.times.nice + oldCore.times.sys + oldCore.times.idle + oldCore.times.irq;
  let totalAvg = totalN - totalOld == 0 ? 1 : totalN - totalOld;

  let userPerc = userAvg * 100 / totalAvg;
  let nicePerc = niceAvg * 100 / totalAvg;
  let sysPerc = sysAvg * 100 / totalAvg;
  let idlePerc = idleAvg * 100 / totalAvg;
  let irqPerc = irqAvg * 100 / totalAvg;
  let totalPerc = userPerc + nicePerc + sysPerc + irqPerc;

  let result = {
    cpu: index,
    times: {
      user: newCore.times.user,
      nice: newCore.times.nice,
      sys: newCore.times.sys,
      idle: newCore.times.idle,
      irq: newCore.times.irq,
      total: totalN
    },
    diff: {
      user: Number(userPerc.toFixed(3)),
      nice: Number(nicePerc.toFixed(3)),
      sys: Number(sysPerc.toFixed(3)),
      idle: Number(idlePerc.toFixed(3)),
      irq: Number(irqPerc.toFixed(3)),
      total: Number(totalPerc.toFixed(3))
    },
  };
  resolve(result);
});

const calcula = (newI, oldI) => new Promise((resolve, reject) => {
  let actions = [];
  newI.forEach((e, i) => {
    actions.push(calculaCore(e, oldI[i], i));
  });
  let results = Promise.all(actions);
  results.then(result => resolve(result)).catch(error => reject(error));

});


const getNew = () => new Promise((resolve, reject) => {
  try {
    let retorno = [];
    let cpus = os.cpus();
    for (let i = 0; i < cpus.length; i++) {
      let cpu = {};
      cpu['core'] = i;
      cpu['times'] = cpus[i].times;
      retorno.push(cpu);
    }
    resolve(retorno)
  } catch (e) {
    reject(e);
  };

});

const getOld = (tempDB) => new Promise((resolve, reject) => {
  let query = {
    name: "cpuGather"
  };
  tempDB.findOne(query).exec((err, oldI) => {
    if (err) {
      reject(err);
    } else {
      if (oldI == null) {
        process.nextTick(() => {
          getNew().then((oldI1) => {
            resolve(oldI1);
          }).catch(error => reject(error));
        });
      } else {
        resolve(oldI.value);
      };
    };
  });
});

const testRestart = (newCore, oldCore, index) => new Promise((resolve, reject) => {
  if (newCore.times.user - oldCore.times.user < 0) {
    reject(new Error('restart'))
  } else {
    resolve(true);
  };
})

module.exports = (data, tempDB) => new Promise((resolve, reject) => {
  try {
    getOld(tempDB).then((oldI) => {
      getNew().then((newI) => {
        let actions = [];
        newI.forEach((e, i) => {
          actions.push(testRestart(e, oldI[i], i));
        });
        let results = Promise.all(actions);
        results.then(result => {
          calcula(newI, oldI).then(result => {
            let query = {
              name: "cpuGather"
            };
            let update = {
              name: "cpuGather",
              value: result
            };
            let options = {
              upsert: true
            };
            tempDB.update(query, update, options, (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          }).catch(error => reject(error));
        }).catch(error => {
          getNew().then((newI1) => {
            calcula(newI1, newI).then(result => {
              let query = {
                name: "cpuGather"
              };
              let update = {
                name: "cpuGather",
                value: result
              };
              let options = {
                upsert: true
              };
              tempDB.update(query, update, options, (err, data) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(result);
                }
              });
            }).catch(error => reject(error));
          }).catch(error => reject(error));
        });
      }).catch(error => reject(error));
    }).catch(error => reject(error));
  } catch (e) {
    reject(e);
  };
});
