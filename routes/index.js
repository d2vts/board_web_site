var express = require('express');
var router = express.Router();
var models = require('../models');
var cookie = require('cookie-parser');

/* GET home page. */



router.get('/', function (req, res, next) {

  res.cookie('/','before_url',);
 let cookiepath = req.cookie;
 
 console.log("cookiepath :", cookiepath);


let session = req.session;
console.log("session 값은 : ", session);
console.log("session.id의 값은 : ",session.id);

  models.post.findAll({
    limit: 5,
    order: [['createdAt', 'DESC']]
  }).then( result => {

    models.post.findAll({
      limit: 5,
    order: [['views', 'DESC']]}).then( result2 =>{

      res.render("index", {
        posts: result, session:session, postv: result2
      });
    })

  });
});

router.get('/board', function (req, res, next){
  res.redirect('/board/list/1');
})


router.get('/login', function (req, res, next){
  //let before_url = req.headers.referer;
  //res.render('log_in', {before_url: before_url});
  let before_url = req.headers.referer;
  if(req.headers.referer === 'http://localhost:3000/login'){
    before_url = req.session.route;
  }
  else{
    req.session.route = before_url;
  }
  res.render('log_in', {before_url: before_url});

});




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

module.exports = router;
