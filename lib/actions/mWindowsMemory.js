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
      gather['total'] = parseInt(results[0]) * 1024;
      gather['free'] = parseInt(results[1]) * 1024;
      gather['used'] = gather['total'] - gather['free'];
      resolve(gather);
    }, err => {
      reject(err);
    });
  } catch (e) {
    reject(e);
  };
});
