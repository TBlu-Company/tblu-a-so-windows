'use strict';
const os = require('os');
const q = require('q');
const callWMIC = require('../util/callWMIC');


// [ { socketID: '0',
//     architecture: '64',
//     cores: '2',
//     thread: 4,
//     vendor: 'GenuineIntel',
//     family: '6',
//     model: '37',
//o['stepping'] = e['stepping'];
//     name: 'Intel(R) Core(TM) i3 CPU       M 330  @ 2.13GHz',
//     flags:
//      [ 'fpu',
//
//        'dtherm',
//        'arat' ] } ]






module.exports = (data) => new Promise((resolve, reject) => {
  try {
    q.all([
      callWMIC('CPU ', 'DataWidth,Description,DeviceID,Manufacturer,MaxClockSpeed,Name,NumberOfCores,NumberOfLogicalProcessors', 'list')
    ]).then(results => {

      let gather = [];
      results[0].forEach(item => {
        item['socketID'] = item.deviceID.replace('CPU', '');
        delete item['deviceID'];
        item['architecture'] = item.dataWidth;
        delete item['dataWidth'];
        item['cores'] = item.numberOfCores;
        delete item['numberOfCores'];
        item['thread'] = item.numberOfLogicalProcessors;
        delete item['numberOfLogicalProcessors'];
        item['vendor'] = item.manufacturer;
        delete item['manufacturer'];
        let t = item.description.split(' ');
        item['family'] = t[2];
        item['model'] = t[4];
        item['stepping'] = t[6];
        delete item['description'];
        delete item['node'];
        gather.push(item);
      });
      resolve(gather);
    }, err => {
      reject(err);
    });
  } catch (e) {
    reject(e);
  };
});
