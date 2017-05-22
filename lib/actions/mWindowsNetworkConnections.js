'use strict';
const childProcess = require('child_process');
const os = require('os');

const processa = (line) => new Promise((resolve, reject) => {
    if (line[3] != 'LISTENING' && line[0] != 'UDP') {
              let laddress = '';
              let lport = 0;
              let arrayP = line[1].split(':');
              if (arrayP.length > 1) {
                  lport = Number(arrayP[1]);
                  laddress = arrayP[0];
              };

              let fport = 0;
              let faddress = '';
              let arrayF = line[2].split(':');
              if (arrayF.length > 1) {
                  fport = Number(arrayF[1]);
                  faddress = arrayF[0];
              };

        let result = {
                    'protocol': line[0],
                    'localaddress': laddress,
                    'localport': lport,
                    'peeraddress': faddress,
                    'peerport': fport,
                    'state': line[3]
                };
                resolve(result);
    } else {
        reject();
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
                });

            //     if (line.length >= 4) {
            //         let protocol = line[1];
            //         let laddress = '';
            //         let lport = 0;
            //         let arrayP = line[2].split(':');
            //         if (arrayP.length > 1) {
            //             lport = Number(arrayP[1]);
            //             laddress = arrayP[0];
            //         }
            //
            //         let fport = 0;
            //         let faddress = '';
            //         let arrayF = line[3].split(':');
            //         if (arrayF.length > 1) {
            //             fport = Number(arrayF[1]);
            //             faddress = arrayF[0];
            //         }
            //         result.push({
            //             'protocol': protocol,
            //             'localaddress': laddress,
            //             'localport': lport,
            //             'peeraddress': faddress,
            //             'peerport': fport,
            //             'state': line[4]
            //         })
            //     }
            });
            resolve(result);
        });
    } catch (e) {
        reject(e);
    };
});
