var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b8b8197d27206c',
    password: 'bba88667',
    database: 'heroku_c56e2e2c5d5ec8a'
});

function handleDisconnect() {
    db.connect(function (err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
    });

    db.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();
console.log("MySQL 직접 DB 연결 성공");


module.exports = db;


// var mysql = require('mysql');
// var db = mysql.createConnection({
//     host: 'us-cdbr-east-06.cleardb.net',
//     user: 'b8b8197d27206c',
//     password: 'bba88667',
//     database:'heroku_c56e2e2c5d5ec8a'
// });

// db.connect();
// console.log("MySQL 직접 DB 연결 성공");
// module.exports=db;
// heroku 연동중 일어난 mysql connection error 해결을 위한 back up