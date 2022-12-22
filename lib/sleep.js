const db = require('./database.js');

exports.sleep = function (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

exports.wrap_db = function (query,input) {
    return new Promise((resolve, reject) => {
      db.query(query, input,(error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
}