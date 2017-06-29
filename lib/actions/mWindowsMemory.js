'use strict';
const os = require('os');
const q = require('q');
const callWMIC = require('../util/callWMIC');

module.exports = (data) => new Promise((resolve, reject) => {
  try {
    q.all([
      callWMIC('os', 'TotalVisibleMemorySize'),
      callWMIC('os', 'FreePhysicalMemory')
    ]).then(results => {
      let gather = {};
      gather['memoryTotal'] = parseInt(results[0]) * 1024;
      gather['memoryFree'] = parseInt(results[1]) * 1024;
      gather['memoryUsed'] = gather['memoryTotal'] - gather['memoryFree'];
      resolve(gather);
    }, err => {
      reject(err);
    });
  } catch (e) {
    reject(e);
  };
});
