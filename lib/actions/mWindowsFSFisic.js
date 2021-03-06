'use strict';
const os = require('os');
const q = require('q');
const callWMIC = require('../util/callWMIC');

module.exports = (data) => new Promise((resolve, reject) => {
  try {
    q.all([
      callWMIC('DISKDRIVE ', 'DeviceID,InterfaceType,Model,Size,Description,Status,StatusInfo,SerialNumber,MediaType,MediaLoaded,MediaLoaded,Partitions', 'list')
    ]).then(results => {


      let gather = [];
      results[0].forEach(item => {
        item['name'] = item.deviceID.replace('\\\\.', '');
        delete item['deviceID'];
        item['protocol'] = item.interfaceType;
        delete item['interfaceType'];
        item['physical'] = item.description;
        delete item['description'];
        item['serial'] = item.serialNumber;
        delete item['serialNumber'];
        item['type'] = item.mediaType;
        delete item['mediaType'];
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
