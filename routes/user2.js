var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var crypto = require('crypto');

router.post('/check_id', function (req, res, next) {
    let form_id = req.body.id;
    //body에 객체형태로 id값이 들어옴 ex){ { id: 'efef' }}
    console.log("회원가입 폼에서 들어온 id post 값 : ", form_id);
    
    db.query(`SELECT user_id FROM users`, function(error, user_id_in_db){
        if(error) console.log("[mysql] users DB -> user2.js error ");
       var result = '1';
       for(var i = 0 ; i < user_id_in_db.length ; i++){
        if(user_id_in_db[i].user_id==form_id) result ='0';        
    }
    res.send(result);
    });
});

router.post('/check_nickname', function (req, res, next) {
    let form_nickname = req.body.nickname;
    //body에 객체형태로 nickname값이 들어옴 ex){ { nickname: 'efef' }}
    console.log("회원가입 폼에서 들어온 nickname post 값 : ", form_nickname);
    
    db.query(`SELECT nickname FROM users`, function(error, nickname_in_db){
        if(error) console.log("[mysql] users DB -> user2.js error ");
       var result = '1';
       for(var i = 0 ; i < nickname_in_db.length ; i++){
        if(nickname_in_db[i].nickname==form_nickname) result ='0';        
    }
    res.send(result);
    });
});


router.post('/sign_up_process', function (req, res, next){
    var post = req.body;
    console.log(post);
    //crypto를 사용한 비밀번호 암호화
    var inputPassword = post.password;
    var salt = Math.round((new Date().valueOf() * Math.random())) + "";
    var hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");
    db.query(`insert into users (user_id, password, nickname, phone, area, gender, createdAt, updatedAt) values(?, ?, ?, ?, ?, ?, now(),now())`,
      [post.id, hashPassword, post.nickname, post.phone, post.area, post.gender],
      function(err, result){
        if(err){
            throw err;
        }
        res.redirect("/");
    });



});



module.exports = router;