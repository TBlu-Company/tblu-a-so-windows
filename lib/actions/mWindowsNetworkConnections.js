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
            lines.splice(0, 3);
            lines.forEach(function(line) {
                line = line.replace(/ +/g, " ").split(' ');
                if (line.length >= 4) {
                    let protocol = line[1];
                    let laddress = '';
                    let lport = 0;
                    let arrayP = line[2].split(':');
                    if (arrayP.length > 1) {
                        lport = Number(arrayP[1]);
                        laddress = arrayP[0];
                    }

                    let fport = 0;
                    let faddress = '';
                    let arrayF = line[3].split(':');
                    if (arrayF.length > 1) {
                        fport = Number(arrayF[1]);
                        faddress = arrayF[0];
                    }
                    result.push({
                        'protocol': protocol,
                        'localaddress': laddress,
                        'localport': lport,
                        'peeraddress': faddress,
                        'peerport': fport,
                        'state': line[4]
                    })
                }
            });
            resolve(result);
        });
    } catch (e) {
        reject(e);
    };
});
