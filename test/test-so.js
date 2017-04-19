'use strict';
const Datastore = require('nedb');
const path = require('path');
const dirname = path.dirname(__filename);
const dBconfig = new Datastore(dirname + '/config.db');
dBconfig.loadDatabase();
const core = require('../index.js');

describe('mOSHostname', function() {
  it('get mOSHostname', function(done) {
    let data = {};
    data['moduleFunction'] = "mOSHostname";
    core.run(data).then(result => {
      console.log(result);
      done();
    }).catch(error => {
      done(error);
    });
  });
});


describe('mWindowsMemory', function() {
  it('get mWindowsMemory', function(done) {
    let data = {};
    data['moduleFunction'] = "mWindowsMemory";
    core.run(data).then(result => {
      console.log(result);
      done();
    }).catch(error => {
      done(error);
    });
  });
});

describe('mWindowsCPU', function() {
  it('get mWindowsCPU', function(done) {
    let data = {};
    data['moduleFunction'] = "mWindowsCPU";
    core.run(data, dBconfig).then(result => {
      console.log(result);
      done();
    }).catch(error => {
      done(error);
    });
  });
});

describe('mWindowsFSLogic', function() {
  it('get mWindowsFSLogic', function(done) {
    let data = {};
    data['moduleFunction'] = "mWindowsFSLogic";
    core.run(data).then(result => {
      console.log(result);
      done();
    }).catch(error => {
      done(error);
    });
  });
});

describe('mWindowsFSFisic', function() {
  it('get mWindowsFSFisic', function(done) {
    let data = {};
    data['moduleFunction'] = "mWindowsFSFisic";
    core.run(data).then(result => {
      console.log(result);
      done();
    }).catch(error => {
      done(error);
    });
  });
});

describe('mWindowsCPUInfo', function() {
  it('get mWindowsCPUInfo', function(done) {
    let data = {};
    data['moduleFunction'] = "mWindowsCPUInfo";
    core.run(data).then(result => {
      console.log(result);
      done();
    }).catch(error => {
      done(error);
    });
  });
});
