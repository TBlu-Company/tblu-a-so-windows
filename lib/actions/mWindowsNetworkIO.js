'use strict';
const os = require('os');
const q = require('q');
const callPowerShell = require('../util/callPowerShell');
const _ = require('lodash');

const calcula = (n, dBconfig) => new Promise((resolve, reject) => {
  let query = {
    iface: n.iface
  };
  dBconfig.findOne(query).exec(function(err, o) {
    if (err) {
      reject(err);
    } else {
      if (o == null || o.value.rx > n.rx || o.value.tx > n.tx) {
        o = {};
        o['value'] = {
          rx: 0,
          tx: 0,
        };
      };
      n['rxDif'] = n.rx - o.value.rx;
      n['txDif'] = n.tx - o.value.tx;
      let update = {
        iface: n.iface,
        value: n
      };
      let options = {
        upsert: true
      };
      dBconfig.update(query, update, options, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(n);
        }
      });
    };
  });
});

module.exports = (data, dBconfig) => new Promise((resolve, reject) => {
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
      let actions = gather.map((n) => {
        return calcula(n, dBconfig);
      });
      Promise.all(actions).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err)
      });
      //     { iface: 'lo',
      // rx: 65959229,
      // tx: 65959229,
      // rxDif: 50033695,
      // txDif: 50033695 }

      // resolve(gather);
    }, err => {
      reject(err);
    });
  } catch (e) {
    reject(e);
  };
});
