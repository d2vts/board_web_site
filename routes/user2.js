var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.post('/check_id', function (req, res, next) {

    let form_id = req.body.id;
    //body에 객체형태로 id값이 들어옴 ex){ { id: 'efef' }}
    console.log("회원가입 폼에서 들어온 post 값 : ", form_id);
    
    db.query(`SELECT user_id FROM users`, function(error, user_id_in_db){
        if(error) console.log("[mysql] users DB -> user2.js error ");
        var result= user_id_in_db[0].user_id;

        if(result!=form_id){
            res.send('1');
            console.log("ID CHECK ajax로 전송완료");
        }
        else{
            res.send('0');
            console.log("ID CHECK ajax로 전송완료");
        }
    });

});

module.exports = router;