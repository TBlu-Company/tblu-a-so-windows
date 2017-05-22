'use strict';
const childProcess = require('child_process')

module.exports = (data) => new Promise((resolve, reject) => {
    try {
        childProcess.exec('netstat', (err, sdtout, stderr) => {
            if (err) {
                console.error(`exec error: ${error}`);
                return;
            } else {
                let result = {};
                result = stdout;
                resolve(result);
            }
        });
    } catch (e) {
        reject(e);
    };
});
