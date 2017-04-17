'use strict';
const osHostname = require('./actions/osHostname');
const mWindowsMemory = require('./actions/mWindowsMemory');
const mWindowsCPU = require('./actions/mWindowsCPU');
const mWindowsFSLogic = require('./actions/mWindowsFSLogic');

exports.run = (data, dBconfig) => new Promise((resolve, reject) => {
  switch (data.moduleFunction) {
    case "mOSHostname":
      osHostname(data).then(result => resolve(result)).catch(error => reject(error));
      break;
    case "mWindowsMemory":
      mWindowsMemory(data).then(result => resolve(result)).catch(error => reject(error));
      break;
    case "mWindowsFSLogic":
      mWindowsFSLogic(data).then(result => resolve(result)).catch(error => reject(error));
      break;
    case "mWindowsCPU":
      mWindowsCPU(data, dBconfig).then(result => resolve(result)).catch(error => reject(error));
      break;
    default:
      reject(new Error('unknow funcition'));
      break;
  }
});
