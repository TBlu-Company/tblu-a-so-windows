'use strict';
const osHostname = require('./actions/osHostname');
const mWindowsMemory = require('./actions/mWindowsMemory');
const mWindowsCPU = require('./actions/mWindowsCPU');
const mWindowsFSLogic = require('./actions/mWindowsFSLogic');
const mWindowsFSFisic = require('./actions/mWindowsFSFisic');
const mWindowsCPUInfo = require('./actions/mWindowsCPUInfo');
const mWindowsNetworkIO = require('./actions/mWindowsNetworkIO');




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
    case "mWindowsFSFisic":
      mWindowsFSFisic(data).then(result => resolve(result)).catch(error => reject(error));
      break;
    case "mWindowsCPUInfo":
      mWindowsCPUInfo(data).then(result => resolve(result)).catch(error => reject(error));
      break;
    case "mWindowsNetworkIO":
      mWindowsNetworkIO(data).then(result => resolve(result)).catch(error => reject(error));
      break;
    case "mWindowsCPU":
      mWindowsCPU(data, dBconfig).then(result => resolve(result)).catch(error => reject(error));
      break;
    default:
      reject(new Error('unknow funcition'));
      break;
  }
});
