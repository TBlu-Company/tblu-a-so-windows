'use strict';
const childProcess = require('child_process');
const os = require('os');
const processaLinha = require('./atom/processaLinhaNetConnection');

const processa = (line) => new Promise((resolve, reject) => {
    if (line[0].toUpperCase() == 'UDP' || line[3].toUpperCase() == 'LISTENING') {
        resolve(processaLinha(line));
    } else {
        reject(undefined);
    }
});

module.exports = (data) => new Promise((resolve, reject) => {
    try {
        childProcess.exec('netstat -na', (err, stdout) => {
            if (err) {
                reject(err);
            }
            let result = [];
            let lines = stdout.trim().split(os.EOL);
            lines.splice(0, 3);

            lines.forEach((line) => {
                line = line.replace(/ +/g, " ").split(' ');
                line.splice(0, 1);
                processa(line).then((resultline) => {
                    result.push(resultline);
              }).catch((e) => {});
            });
            resolve(result);
        });
    } catch (e) {
        reject(e);
    };
});
