var express = require('express');
var router = express.Router();
var mysql = require("mysql");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

let client = mysql.createConnection({
  user: 'root',
  password: '1q2w3e4r5t',
  database: 'sign_db'
})

module.exports = router;
