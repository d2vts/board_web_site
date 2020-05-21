var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b0a58a2c1735c7',
    password: 'f82d9515',
    database:'heroku_e145e9d08a419b3'
});

db.connect();
console.log("MySQL 직접 DB 연결 성공");
module.exports=db;