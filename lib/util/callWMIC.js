const q = require('q');
const childProcess = require('child_process')

module.exports = (x, y) => {
  let deffered = q.defer();
  childProcess.exec('wmic ' + x + ' get ' + y + ' /format:value', function(err, stdout) {
    if (err) {
      deffered.reject(err);
    } else {
      let used = stdout.split('\n')[2].split('=')[1];
      deffered.resolve(used);
    }
  });
  return deffered.promise;
}
