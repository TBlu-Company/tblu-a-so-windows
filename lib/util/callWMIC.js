const q = require('q');
const childProcess = require('child_process')

module.exports = (x, y, format) => {
  let deffered = q.defer();
  if (typeof format != 'undefined') {
    if (format == 'list') {
      childProcess.exec('wmic ' + x + ' get ' + y + ' /format:"%WINDIR%\\System32\\wbem\\en-US\\csv"', function(err, stdout) {
        if (err) {
          deffered.reject(err);
        } else {
          let retorno = stdout.trim().replace(/\r/g, '').split('\n')
          let keys = retorno[0].split(',');
          let out = [];
          for (let j = 1; j < retorno.length; j++) {
            let tmp = {};
            for (let i = 0; i < keys.length; i++) {
              let value = retorno[j].split(',');
              let vt = value[i];
              if (!isNaN(vt)) {
                vt = Number(vt);
              } else if (vt.toLowerCase() == "true" || vt.toLowerCase() == "false") {
                vt = Boolean(vt);
              }
              tmp[keys[i].charAt(0).toLowerCase() + keys[i].slice(1)] = vt;
            }
            out.push(tmp);
          }
          deffered.resolve(out);
        }
      });
    }
  } else {
    childProcess.exec('wmic ' + x + ' get ' + y + ' /format:value', function(err, stdout) {
      if (err) {
        deffered.reject(err);
      } else {
        let used = stdout.split('\n')[2].split('=')[1];
        deffered.resolve(used);
      }
    });
  }

  return deffered.promise;
}
