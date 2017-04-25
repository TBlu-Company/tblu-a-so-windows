'use strict';
const os = require('os');
const q = require('q');
const callWMIC = require('../util/callWMIC');

module.exports = (data) => new Promise((resolve, reject) => {
  try {
    q.all([
      callWMIC('CPU', 'DataWidth,Description,DeviceID,Manufacturer,MaxClockSpeed,Name,NumberOfCores,NumberOfLogicalProcessors', 'list')
    ]).then(results => {

      let gather = [];
      results[0].forEach(item => {
        item['socketID'] = Number(item.deviceID.replace('CPU', ''));
        delete item['deviceID'];
        item['architecture'] = Number(item.dataWidth);
        delete item['dataWidth'];
        item['cores'] = Number(item.numberOfCores);
        delete item['numberOfCores'];
        item['thread'] = Number(item.numberOfLogicalProcessors);
        delete item['numberOfLogicalProcessors'];
        item['vendor'] = item.manufacturer;
        delete item['manufacturer'];
        let t = item.description.split(' ');
        item['family'] = Number(t[2]);
        item['model'] = Number(t[4]);
        item['stepping'] = Number(t[6]);
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
