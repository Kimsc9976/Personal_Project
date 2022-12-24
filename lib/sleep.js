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
exports.wrap = function () {
  // FIXME: Promise와 catch를 이용하면 더 간결해질 것 같습니다.
  return new Promise((resolve, reject) => {
      try {
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });  
  }
  