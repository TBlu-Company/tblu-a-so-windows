'use strict';
const os = require('os');
const q = require('q');
const callWMIC = require('../util/callWMIC');

module.exports = (data) => new Promise((resolve, reject) => {
  try {
    q.all([
      callWMIC('LOGICALDISK ', 'Caption,Compressed,Description,DeviceID,DriveType,FileSystem,FreeSpace,Name,Size,VolumeSerialNumber,VolumeName', 'list')
    ]).then(results => {
      let gather = results[0].map(item => {
        item['mount'] = item.deviceID;
        delete item['deviceID'];
        item['type'] = item.fileSystem;
        delete item['fileSystem'];
        delete item['node'];
        item['used'] = item.size - item.freeSpace;
        item['use'] = parseFloat((item.used * 100 / item.size).toFixed(2));
        return item;
      });
      resolve(gather);
    }, err => {
      reject(err);
    });
  } catch (e) {
    reject(e);
  };
});
