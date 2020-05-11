var express = require('express');
var router = express.Router();
var models = require('../models');
/* GET home page. */



router.get('/', function (req, res, next) {
let session = req.session;
console.log("session 값은 : ", session);
console.log("session.id의 값은 : ",session.id);

  models.post.findAll({
    limit: 5,
    order: [['createdAt', 'DESC']]
  }).then( result => {
    res.render("index", {
      posts: result, session:session
    });
  });
});

router.get('/board', function (req, res, next){
  res.redirect('/board/list/1');
})


router.get('/login', function (req, res, next){
  res.render('log_in');
})
router.get('/login/towrp', function (req, res, next){
  res.render('log_in',{reason:'retowrp'});
})

router.get("/logout", function(req,res,next){
  req.session.destroy();
  res.clearCookie('sid');

  res.redirect("/")
})

router.get('/sign_up', function (req, res, next){
  res.render('sign_up');
})
/*
let client = mysql.createConnection({
  user: 'root',
  password: '1q2w3e4r5t',
  database: 'sign_db'
})
*/

module.exports = router;
