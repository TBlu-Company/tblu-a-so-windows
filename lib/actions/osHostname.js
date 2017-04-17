'use strict';
const os = require('os');
module.exports = (data) => new Promise((resolve, reject) => {
    try {
        let gather = {};
        gather['hostname'] = os.hostname();
        resolve(gather);
    } catch (e) {
        reject(e);
    };
});
