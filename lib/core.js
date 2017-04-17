'use strict';
const osHostname = require('./actions/osHostname.js');

exports.run = (data, dBconfig) => new Promise((resolve, reject) => {
    switch (data.moduleFunction) {
        case "mOSHostname":
            osHostname(data).then(result => resolve(result)).catch(error => reject(error));
            break;
        default:
            reject(new Error('unknow funcition'));
            break;
    }
});
