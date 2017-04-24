// [{
//     iface: 'lo',
//     operstate: 'unknown',
//     rx: 33269490,
//     tx: 33269490,
//     rx_sec: -1,
//     tx_sec: -1,
//     ms: 0,
//     rxDif: -253589571,
//     txDif: -253589571
//   },
//   {
//     iface: 'wlan0',
//     operstate: 'up',
//     rx: 312344746,
//     tx: 23626946,
//     rx_sec: -1,
//     tx_sec: -1,
//     ms: 0,
//     rxDif: -228861080,
//     txDif: -10768443
//   }
// ]


'use strict';
const os = require('os');
const q = require('q');
const callWMIC = require('../util/callWMIC');
const perfmon = require('perfmon');

module.exports = (data) => new Promise((resolve, reject) => {
  try {
    let lista = [
      '\\Network Interface(AWS PV Network Device _0)\\Packets Received/sec',
      '\\Network Interface(AWS PV Network Device _0)\\Packets Sent/sec'
    ];
    perfmon.list('Network Interface', function(err, lista) {
      perfmon(lista, function(err, data) {
        resolve(data);
      });
    });

    // q.all([
    //   callWMIC('LOGICALDISK ', 'Caption,Compressed,Description,DeviceID,DriveType,FileSystem,FreeSpace,Name,Size,VolumeSerialNumber,VolumeName', 'list')
    // ]).then(results => {
    //
    //   // { fs: '/dev/sda5',
    //   //     type: 'ext4',
    //   //     size: 628620337152,
    //   //     used: 76423860224,
    //   //     use: 12.16,
    //   //     mount: '/' }
    //
    //   // {
    //   //   Node: 'EC2AMAZ-1NRLJNM',
    //   //   Caption: 'C:',
    //   //   Compressed: 'FALSE',
    //   //   Description: 'Local Fixed Disk',
    //   //   DeviceID: 'C:',
    //   //   DriveType: '3',
    //   //   FileSystem: 'NTFS',
    //   //   FreeSpace: '9109233664',
    //   //   Name: 'C:',
    //   //   Size: '32210153472',
    //   //   VolumeName: 'Windows',
    //   //   VolumeSerialNumber: '7A7211DF'
    //   // }
    //
    //   let gather = [];
    //   results[0].forEach(item => {
    //     item['mount'] = item.deviceID;
    //     delete item['deviceID'];
    //     item['type'] = item.fileSystem;
    //     delete item['fileSystem'];
    //     delete item['node'];
    //     item['used'] = item.size - item.freeSpace;
    //     item['use'] = parseFloat((item.used * 100 / item.size).toFixed(2));
    //     gather.push(item);
    //   });
    //   // gather['total'] = parseInt(results[0]) * 1024;
    //   // gather['free'] = parseInt(results[1]) * 1024;
    //   // gather['used'] = gather['total'] - gather['free'];
    //   resolve(gather);
    // }, err => {
    //   reject(err);
    // });
  } catch (e) {
    reject(e);
  };
});
