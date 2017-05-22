'use strict';
const childProcess = require('child_process')

module.exports = (data) => new Promise((resolve, reject) => {
    try {
        childProcess.exec('netstat', (err, stdout) => {
            if (err) {
                console.error(`exec error: ${error}`);
                return;
            }
            let lines = stdout.toString().split('\r\n');
            lines.forEach(function(line) {
                line = line.replace(/ +/g, " ").split(' ');
                if (line.length >= 6) {
                    let protocol = line[3];
                    let localaddress = line[3].split(':');
                    if (localaddress.length > 1) {
                        localport = localaddress[localaddress.length - 1];
                        localaddress.pop();
                        localip = localaddress.join(':');
                    }
                    let fAddress = line[4];
                    let peerport = '';
                    let peeraddress = line[4].split(':');
                    if (peeraddress.length > 1) {
                        peerport = peeraddress[peeraddress.length - 1];
                        peeraddress.pop();
                        peerip = peeraddress.join(':');
                    }
                    let state = line[5];
                    result.push({
                        protocol: line[0],
                        localaddress: localip,
                        localport: localport,
                        peeraddress: peerip,
                        peerport: peerport,
                        state: connstate
                    })
                }
            });
            resolve(lines);
        });
    } catch (e) {
        reject(e);
    };
});
