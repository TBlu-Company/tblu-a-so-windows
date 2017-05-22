'use strict';
const childProcess = require('child_process')

module.exports = (data) => new Promise((resolve, reject) => {
    try {
        childProcess.exec('netstat', (err, stdout) => {
            if (err) {
                console.error(`exec error: ${error}`);
                return;
            }
            let result = [];
            let lines = stdout.toString().split('\r\n');
            lines.forEach(function(line) {
                line = line.replace(/ +/g, " ").split(' ');
                if (line.length >= 6) {
                    let protocol = line[3];
                    let localport = '';
                    let localaddress = line[3].split(':');
                    let localip = '';
                    if (localaddress.length > 1) {
                        localport = localaddress[localaddress.length - 1];
                        localaddress.pop();
                        localaddress = localaddress.join(':');
                    }
                    let fAddress = line[4];
                    let peerport = '';
                    let peeraddress = line[4].split(':');
                    if (peeraddress.length > 1) {
                        peerport = peeraddress[peeraddress.length - 1];
                        peeraddress.pop();
                        fAddress = peeraddress.join(':');
                    }
                    let state = line[5];
                    result.push({
                        protocol: line[0],
                        localaddress: localaddress,
                        localport: localport,
                        peeraddress: fAddress,
                        peerport: peerport,
                        state: connstate
                    })
                }
            });
            resolve(result);
        });
    } catch (e) {
        reject(e);
    };
});
