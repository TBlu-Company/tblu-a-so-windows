'use strict';
const os = require('os');
const exec = require('child_process').exec;


const calculaCore = (newCore, oldCore, index) => new Promise((resolve, reject) => {
  if (typeof oldCore == 'undefined' || newCore.times.user < oldCore.times.user ||
    newCore.times.nice < oldCore.times.nice ||
    newCore.times.sys < oldCore.times.sys ||
    newCore.times.idle < oldCore.times.idle ||
    newCore.times.irq < oldCore.times.irq) {
    oldCore = {
      times: {
        user: 0,
        nice: 0,
        sys: 0,
        idle: 0,
        irq: 0
      },
      totalTimes: 0,
    };
  };
  let totalN = newCore.times.user + newCore.times.nice + newCore.times.sys + newCore.times.idle + newCore.times.irq;
  let userAvg = newCore.times.user - oldCore.times.user;
  let niceAvg = newCore.times.nice - oldCore.times.nice;
  let sysAvg = newCore.times.sys - oldCore.times.sys;
  let idleAvg = newCore.times.idle - oldCore.times.idle;
  let irqAvg = newCore.times.irq - oldCore.times.irq;
  let totalAvg = totalN - oldCore.totalTimes;

  let userPerc = ((userAvg * 100) / totalAvg).toFixed(3);
  let nicePerc = ((niceAvg * 100) / totalAvg).toFixed(3);
  let sysPerc = ((sysAvg * 100) / totalAvg).toFixed(3);
  let idlePerc = ((idleAvg * 100) / totalAvg).toFixed(3);
  let irqPerc = ((irqAvg * 100) / totalAvg).toFixed(3);

  let result = {
    cpu: index,
    times: {
      user: newCore.times.user,
      nice: newCore.times.nice,
      sys: newCore.times.sys,
      idle: newCore.times.idle,
      irq: newCore.times.irq
    },
    diff: {
      user: userPerc,
      nice: nicePerc,
      sys: sysPerc,
      idle: idlePerc,
      irq: irqPerc
    },
    totalTimes: totalN
  };
  resolve(result);
});

const calculaCPU = (newCPU, oldCPU) => new Promise((resolve, reject) => {
  let actions = [];
  newCPU.forEach((e, i) => {
    actions.push(calculaCore(e, oldCPU[i], i));
  });
  let results = Promise.all(actions);
  results.then(result => resolve(result)).catch(error => reject(error));

});


const getCPU = () => new Promise((resolve, reject) => {
  try {

    let retorno = [];
    let cpus = os.cpus();
    for (let i = 0; i < cpus.length; i++) {
      let pline = cpus[i];
      pline['core'] = i;
      pline['totalTimes'] = pline.times.user + pline.times.nice + pline.times.sys + pline.times.idle + pline.times.irq;
      retorno.push(cpus[i]);
    }
    resolve(retorno);
  } catch (e) {
    reject(e);
  };

});

module.exports = (data, dBconfig) => new Promise((resolve, reject) => {
  try {
    let query = {
      name: "windowsCPU"
    };
    dBconfig.findOne(query).exec(function(err, oldCPU) {
      if (err) {
        reject(err);
      } else {
        if (oldCPU == null) {
          oldCPU = {};
          oldCPU['value'] = [];
        }
        let newCPU = getCPU().then(result => {
          newCPU = result;
          calculaCPU(newCPU, oldCPU.value).then(result => {
            let update = {
              name: "windowsCPU",
              value: result
            };
            let options = {
              upsert: true
            };
            dBconfig.update(query, update, options, (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          }).catch(error => reject(error));
        }).catch(error => reject(error));;
      };
    });
  } catch (e) {
    reject(e);
  };
});
