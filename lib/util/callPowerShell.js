const q = require('q');
const shell = require('node-powershell');

module.exports = (x, y) => {
  let deffered = q.defer();
  let ps = new shell({
    executionPolicy: 'Bypass',
    noProfile: true,
    debugMsg: false
  });

  ps.addCommand('get-wmiobject ' + x + ' | Select ' + y + '| Format-List');
  ps.invoke()
    .then(output => {
      let retorno = output.trim().replace(/\r/g, '').split('\n')
      let saida = [];
      let tObj = {};
      for (let j = 0; j < retorno.length; j++) {
        let tArray = retorno[j].split(':');
        if (tArray.length <= 1) {
          saida.push(tObj);
          tObj = {};
        }
        if (tArray.length >= 2) {
          let key = tArray[0].trim();
          let vt = tArray[1].trim();
          if (!isNaN(vt)) {
            vt = Number(vt);
          } else if (vt.toLowerCase() == "true" || vt.toLowerCase() == "false") {
            vt = Boolean(vt);
          }
          tObj[key.charAt(0).toLowerCase() + key.slice(1)] = vt;
        };
      };
      saida.push(tObj);
      ps.dispose();
      deffered.resolve(saida);
    }).catch(err => {
      ps.dispose();
      deffered.reject(err);
    });


  // if (typeof format != 'undefined') {
  //   if (format == 'list') {
  //     childProcess.exec('wmic ' + x + ' get ' + y + ' /format:"%WINDIR%\\System32\\wbem\\en-US\\csv"', function(err, stdout) {
  //       if (err) {
  //         deffered.reject(err);
  //       } else {
  //         let retorno = stdout.trim().replace(/\r/g, '').split('\n')
  //         let keys = retorno[0].split(',');
  //         let out = [];
  //         for (let j = 1; j < retorno.length; j++) {
  //           let tmp = {};
  //           for (let i = 0; i < keys.length; i++) {
  //             let value = retorno[j].split(',');
  //             let vt = value[i];
  //             if (!isNaN(vt)) {
  //               vt = Number(vt);
  //             } else if (vt.toLowerCase() == "true" || vt.toLowerCase() == "false") {
  //               vt = Boolean(vt);
  //             }
  //             tmp[keys[i].charAt(0).toLowerCase() + keys[i].slice(1)] = vt;
  //           }
  //           out.push(tmp);
  //         }
  //         deffered.resolve(out);
  //       }
  //     });
  //   }
  // } else {
  //   childProcess.exec('wmic ' + x + ' get ' + y + ' /format:value', function(err, stdout) {
  //     if (err) {
  //       deffered.reject(err);
  //     } else {
  //       let used = stdout.split('\n')[2].split('=')[1];
  //       deffered.resolve(used);
  //     }
  //   });
  // }

  return deffered.promise;
}
