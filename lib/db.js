var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'sign_db'
});

db.connect();
module.exports=db;