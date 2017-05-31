'use strict';
const Datastore = require('nedb');
const path = require('path');
const dirname = path.dirname(__filename);
const dBconfig = new Datastore(dirname + '/config.db');
dBconfig.loadDatabase();
const core = require('../index.js');


// describe('mWindowsMemory', function() {
//   it('get mWindowsMemory', function(done) {
//     let data = {};
//     data['moduleFunction'] = "mWindowsMemory";
//     core.run(data).then(result => {
//       console.log(result);
//       done();
//     }).catch(error => {
//       done(error);
//     });
//   });
// });
//
// describe('mWindowsCPU', function() {
//   it('get mWindowsCPU', function(done) {
//     let data = {};
//     data['moduleFunction'] = "mWindowsCPU";
//     core.run(data, dBconfig).then(result => {
//       console.log(result);
//       done();
//     }).catch(error => {
//       done(error);
//     });
//   });
// });
//
// describe('mWindowsFSLogic', function() {
//   it('get mWindowsFSLogic', function(done) {
//     let data = {};
//     data['moduleFunction'] = "mWindowsFSLogic";
//     core.run(data).then(result => {
//       console.log(result);
//       done();
//     }).catch(error => {
//       done(error);
//     });
//   });
// });
//
// describe('mWindowsFSFisic', function() {
//   it('get mWindowsFSFisic', function(done) {
//     let data = {};
//     data['moduleFunction'] = "mWindowsFSFisic";
//     core.run(data).then(result => {
//       console.log(result);
//       done();
//     }).catch(error => {
//       done(error);
//     });
//   });
// });
//
// describe('mWindowsCPUInfo', function() {
//   it('get mWindowsCPUInfo', function(done) {
//     let data = {};
//     data['moduleFunction'] = "mWindowsCPUInfo";
//     core.run(data).then(result => {
//       console.log(result);
//       done();
//     }).catch(error => {
//       done(error);
//     });
//   });
// });

// describe('mWindowsNetworkConnections', function() {
//     it('get mWindowsNetworkConnections', function(done) {
//         let data = {};
//         data['moduleFunction'] = "mWindowsNetworkConnections";
//         core.run(data, dBconfig).then(result => {
//             console.log(result);
//             done();
//         }).catch(error => {
//             done(error);
//         });
//     });
// });


// describe('mWindowsNetworkConnectionsListen', function() {
//     it('get mWindowsNetworkConnectionsListen', function(done) {
//         let data = {};
//         data['moduleFunction'] = "mWindowsNetworkConnectionsListen";
//         core.run(data, dBconfig).then(result => {
//             console.log(result);
//             done();
//         }).catch(error => {
//             done(error);
//         });
//     });
// });

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


describe('mWindowsDiskIO', function() {
  it('get mWindowsDiskIO', function(done) {
    let data = {};
    data['moduleFunction'] = "mWindowsDiskIO";
    core.run(data, dBconfig).then(result => {
      console.log(result);
      done();
    }).catch(error => {
      done(error);
    });
  });
});
