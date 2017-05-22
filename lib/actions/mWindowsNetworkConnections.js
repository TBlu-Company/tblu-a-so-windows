'use strict';
const childProcess = require('child_process')

module.exports = (data) => new Promise((resolve, reject) => {
    try {
        childProcess.exec('netstat', (err, stdout) => {
            if (err) {
                console.error(`exec error: ${error}`);
                return;
            } else {
                let result = {};
                let protocol = [];
                for (f in stdout) {
                    protocol.push(f['proto']);
                }
                resolve(protocol);
            }
        });
    } catch (e) {
        reject(e);
    };
});
