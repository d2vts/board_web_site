var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b8b8197d27206c',
    password: 'b8b8197d27206c',
    database:'heroku_c56e2e2c5d5ec8a'
});

db.connect();
console.log("MySQL 직접 DB 연결 성공");
module.exports=db;