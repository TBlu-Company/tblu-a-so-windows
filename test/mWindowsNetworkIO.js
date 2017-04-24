'use strict';
const Datastore = require('nedb');
const path = require('path');
const dirname = path.dirname(__filename);
const dBconfig = new Datastore(dirname + '/config.db');
dBconfig.loadDatabase();
const core = require('../index.js');

describe('mWindowsNetworkIO', function() {
  it('get mWindowsNetworkIO', function(done) {
    let data = {};
    data['moduleFunction'] = "mWindowsNetworkIO";
    core.run(data, dBconfig).then(result => {
      console.log(result);
      done();
    }).catch(error => {
      done(error);
    });
  });
});
