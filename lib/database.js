const mysql = require('mysql');
const db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '712412',
  database : 'db4pp'
});
db.connect();

module.exports = db; // 하나만 export 할 경우
// exports // 여러개를 export할 경우 