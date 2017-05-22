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
                let linhas = {};
                for (let f in stdout) {
                    console.log(f);
                }
                resolve(stdout);
            }
        });
    } catch (e) {
        reject(e);
    };
});
