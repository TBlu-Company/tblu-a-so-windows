'use-strict'
module.exports = (line) => {
    let laddress = '';
    let lport = 0;
    let arrayP = line[1].split(':');
    if (arrayP.length > 1) {
        if (arrayP.length == 2) {
            lport = Number(arrayP[1]);
            laddress = arrayP[0];
        } else {
            lport = Number(arrayP[arrayP.length - 1]);
            arrayP.pop();
            laddress = arrayP.join(':').replace('[', '').replace(']', '');
        }
    };

    let fport = 0;
    let faddress = '';
    let arrayF = line[2];
    if (arrayF.length > 1) {
        if (arrayF.length == 2) {
            fport = Number(arrayF[1]);
            faddress = arrayF[0];
        } else {
            fport = Number(arrayF[arrayF.length - 1]);
            arrayF.pop();
            faddress = arrayF.join(':').replace('[', '').replace(']', '');
        }
    };

    if (line[0].toUpperCase() == 'UDP' || line[3].toUpperCase() == 'LISTENING') {
        faddress = undefined;
        fport = undefined;
        line[3] = 'LISTENING'
    }
    let result = {
        'protocol': line[0],
        'localaddress': laddress,
        'localport': lport,
        'peeraddress': faddress,
        'peerport': fport,
        'state': line[3]
    };
    return JSON.parse(JSON.stringify(result));
};
