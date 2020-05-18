var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var crypto = require('crypto');
var url= require('url');

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
  var sess = req.session;
    let form_nickname = req.body.nickname;
    //body에 객체형태로 nickname값이 들어옴 ex){ { nickname: 'efef' }}
    console.log("회원가입 폼에서 들어온 nickname post 값 : ", form_nickname);
    
    db.query(`SELECT nickname FROM users`, function(error, nickname_in_db){
        if(error) console.log("[mysql] users DB -> user2.js error ");
       var result = '1';
       for(var i = 0 ; i < nickname_in_db.length ; i++){
        if(nickname_in_db[i].nickname==form_nickname) {
          if(form_nickname==sess.nickname){result ='1';}
          else{result ='2';} 
       }   
            
    }
    res.send(result);
    });
});


router.post('/sign_up_process', function (req, res, next){
    var post = req.body;
    console.log(post);
    //crypto를 사용한 비밀번호 암호화
    //var salt = Math.round((new Date().valueOf() * Math.random())) + "";
    //var hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");
    //salt 암호화 까지는 과하다는 생각이들어 빼기로 결정
    var inputPassword = post.password;
    var hashPassword = crypto.createHash("sha512").update(inputPassword).digest("hex");
    db.query(`insert into users (user_id, password, nickname, phone, area, gender, createdAt, updatedAt) values(?, ?, ?, ?, ?, ?, now(),now())`,
      [post.id, hashPassword, post.nickname, post.phone, post.area, post.gender],
      function(err, result){
        if(err){
            throw err;
        }
        res.redirect("/");
    });
});

router.get('/', function(req, res, next) {
  let before_url = req.headers.referer;
  if(before_url=='/login')
  res.render('log_in', {before_url: before_url});
});



// 로그인 POST
router.post('/login', function (req, res, next) {
  console.log("url: ",url.parse);
  var input = req.body;
  var inputPassword = input.password;
  console.log("input 값은 : ", input)
  db.query(`select id,user_id, password,nickname from users where user_id=?`,
    [input.id],
    function (err, result) {
      console.log("rsulst 값은 : ", result[0]);
      if (err) {
        throw err;
      }

      if (result[0] != undefined) {
        var dbpassword = result[0].password;
        console.log("dbpassword는 ", dbpassword);
        var hashPassword = crypto.createHash("sha512").update(inputPassword).digest("hex");
        console.log("hashpassword는 ", hashPassword);
        if (dbpassword === hashPassword) {
          console.log("비밀번호 일치");
          req.session.idx = input.id;
          req.session.nickname= result[0].nickname;
          req.session.idnum = result[0].id;
          console.log("user테이블에서 id 값을 받으면 : ",result[0].id);
          console.log("input.id의 값은 : ", input.id);
          console.log("로그인합니다 세션값은 :",req.session.idx);
          res.redirect(`${input.before_url}`);
        }
        else {
          console.log("비밀번호 불일치");
          res.redirect("/login");
        }
      }

      else {
        console.log("등록되지 않은 ID");
        res.redirect("/login");
      }
    });
});

router.get('/mypage', function(req, res, next) {
  var sess = req.session;

  if(sess.idx){
    res.render('mypage',{sess:sess})
  } else{
    res.render('error')
  }
});



router.get('/mypage/edit_profile', function (req, res, next) {
  var sess = req.session;
  if(sess.idx){
  db.query(`SELECT * FROM users where user_id='${sess.idx}'`,function(err,result){



  res.render('edit_profile',{user_info:result[0],sess:sess});
});
  }
  else{
    res.render('error')
  }
});

router.get('/edit_password', function (req,res,next) {
  var sess = req.session;
  res.render('edit_password',{sess:sess});

})


router.get('/check_password', function (req,res,next) {
  var sess = req.session;
  res.render('check_password',{sess:sess, checkpw:'yes'});

})

router.post('/check_password_process', function (req,res,next) {
  var sess = req.session;
  var inputPassword = req.body.password;
  var hashPassword = crypto.createHash("sha512").update(inputPassword).digest("hex");
  db.query(`SELECT * FROM users where id=${sess.idnum}`,function(err,result){
    
    if(hashPassword===result[0].password){
      console.log("비밀번호 일치!")
      res.redirect("/user2/edit_password")
    }
    else {
      console.log("틀립니다.")
    res.render('check_password',{sess:sess,checkpw:'nono'});
  }
    
  })




})


router.post('/pw_update_process', function (req, res, next) {
  var sess = req.session;
  var inputPassword = req.body.password;
  var hashPassword = crypto.createHash("sha512").update(inputPassword).digest("hex");


  db.query(`update users set password='${hashPassword}' where id=${sess.idnum}`,function(err,result){
  res.redirect("/user2/mypage");
})
});


router.post('/update_process', function (req, res, next) {
  var sess = req.session;
  var rbody = req.body;

  console.log("정보들 : ",rbody.nickname,
    rbody.phone,
    rbody.area,
    rbody.id);


  db.query(`update users set nickname='${rbody.nickname}', phone='${rbody.phone}', area='${rbody.area}' where user_id='${rbody.id}'`,function(err,result){

    sess.nickname = rbody.nickname;

  res.redirect("/user2/mypage");
})
});






router.get('/delete', function (req, res, next) {
  if(req.query.pwconfirm){
  var pwcf = req.query.pwconfirm;
  console.log("req.query.pwconfirm : ", req.query.pwconfirm);
  }
  res.render("withdraw",{sess:req.session,pwcf:pwcf
  });
});

router.post('/delete_process', function (req, res, next) {
  
  let delete_idnum = req.session.idnum
  let confirm_pw = req.body.password;
  var hashPassword = crypto.createHash("sha512").update(confirm_pw).digest("hex");
  console.log("delete_idnum :",delete_idnum);
  console.log("confirm_pw :",confirm_pw);
  console.log("-----------------------------------------------");

  db.query(`select * from users where id=${delete_idnum}`,function(err,result){
    console.log("지울 계정은 : ",result)
    
      if(hashPassword == result[0].password){
        db.query(`DELETE FROM users WHERE id=${delete_idnum}`,function(err,result){
          res.redirect("/");
        })
      }
      else{
        res.redirect('/user2/delete?pwconfirm=no');
      }
  })
});
module.exports = router;