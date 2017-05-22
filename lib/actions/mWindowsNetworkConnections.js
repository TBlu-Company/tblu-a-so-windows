'use strict';
const q = require('q');
const callWMIC = require('../util/callWMIC');

module.exports = (data) => new Promise((resolve, reject) => {
    try {
        q.all([
            callWMIC('nic', 'NetConnectionStatus NetEnabled NetworkAddresses PermanentAddress PhysicalAdapter ProductName ServiceName Speed Status'),
        ]).then(results => {
            let gather = {};
            resolve(gather);
        }, err => {
            reject(err);
        });
    } catch (e) {
        reject(e);
    };
});
