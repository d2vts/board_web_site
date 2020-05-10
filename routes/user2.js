var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.post('/check_id', function (req, res, next) {
    let form_id = req.body.id;
    //body에 객체형태로 id값이 들어옴 ex){ { id: 'efef' }}
    console.log("회원가입 폼에서 들어온 post 값 : ", form_id);
    
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
    console.log("회원가입 폼에서 들어온 post 값 : ", form_nickname);
    
    db.query(`SELECT nickname FROM users`, function(error, nickname_in_db){
        if(error) console.log("[mysql] users DB -> user2.js error ");
       var result = '1';
       for(var i = 0 ; i < nickname_in_db.length ; i++){
        if(nickname_in_db[i].nickname==form_nickname) result ='0';        
    }
    res.send(result);
    });
});


module.exports = router;