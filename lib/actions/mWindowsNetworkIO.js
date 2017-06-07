'use strict';
const os = require('os');
const exec = require('child_process').exec;
const q = require('q');
const callPowerShell = require('../util/callPowerShell');
const _ = require('lodash');

const calculaCore = (newCore, oldCore, index) => new Promise((resolve, reject) => {
  newCore['rxDif'] = newCore.rx - oldCore.rx;
  newCore['txDif'] = newCore.tx - oldCore.tx;
  newCore['totalDif'] = newCore.rxDif + newCore.txDif;
  resolve(newCore);
});

const calcula = (newI, oldI) => new Promise((resolve, reject) => {
  let actions = newI.map((e) => {
    let index1 = _.findIndex(oldI, function(o) {
      return o.iface == e.iface;
    });
    return calculaCore(e, oldI[index1]);
  });
  let results = Promise.all(actions);
  results.then(result => resolve(result)).catch(error => reject(error));

});


const getNew = () => new Promise((resolve, reject) => {
  try {
    q.all([
      callPowerShell('win32_networkadapter -filter \"AdapterType != null\"', 'netconnectionid, name, InterfaceIndex, netconnectionstatus,AdapterType'),
      callPowerShell('Win32_PerfRawData_Tcpip_NetworkInterface', 'BytesReceivedPersec,BytesSentPersec,BytesTotalPersec,Name'),
    ]).then(results => {
      let gather = [];
      results[0].forEach(item => {
        let tmp = {};
        if (isNaN(item.netconnectionid)) {
          tmp['iface'] = item.netconnectionid;
          tmp['name'] = item.name.replace('#', '/');
          gather.push(tmp);
        };
        results[1].forEach(item => {
          item.name = item.name.replace('[', '(').replace(']', ')').replace('_', '/');
          if (tmp.name == item.name) {
            tmp['rx'] = item.bytesReceivedPersec;
            tmp['tx'] = item.bytesSentPersec;
          };
        });
      });
      resolve(gather);
    }).catch(error => reject(error));;
  } catch (e) {
    reject(e);
  };
});

const getOld = (tempDB) => new Promise((resolve, reject) => {
  let query = {
    name: "mWindowsNetworkIO"
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
  if (newCore.rx - oldCore.rx < 0) {
    reject(new Error('restart'))
  } else {
    resolve(true);
  };
})

module.exports = (data, tempDB) => new Promise((resolve, reject) => {
  try {
    getOld(tempDB).then((oldI) => {
      getNew().then((newI) => {
        let actions = newI.map((e) => {
          let index1 = _.findIndex(oldI, function(o) {
            return o.iface == e.iface;
          });
          return testRestart(e, oldI[index1]);
        });
        let results = Promise.all(actions);
        results.then(result => {
          calcula(newI, oldI).then(result => {
            let query = {
              name: "mWindowsNetworkIO"
            };
            let update = {
              name: "mWindowsNetworkIO",
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
                name: "mWindowsNetworkIO"
              };
              let update = {
                name: "mWindowsNetworkIO",
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
