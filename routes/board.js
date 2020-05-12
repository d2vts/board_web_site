var express = require('express');
var router = express.Router();
var models = require('../models');
var db = require('../lib/db');

/*
router.get('/', function(req, res, next) {
  models.post.findAll().then( result => {
    res.render("board_list", {
      posts: result
    });
  });
});
*/
router.get('/', function (req, res, next) {
  res.redirect('/board/list/1');
});

router.get('/list/1', function (req, res, next) {
  var sess = req.session;
  db.query(`SELECT id,nickname FROM users`, function (err, users_info) {
    console.log('users_info : ', users_info);
    models.post.findAll().then(result => {
      for(var i = 0 ; i < users_info.length; i++){
        console.log("result : ", result);
      }

      res.render("board_list", {
        posts: result,users:users_info ,sess: sess.idx

      })
    })
  });
});  
/*
router.get('/list/:page', function (req, res, next) {
  var page = req.params.page;
  models.post.findAll().then(result => {
    res.render("board_list", {
      posts: result
    });
  });
});
*/

router.get('/create', function (req, res, next) {
  let sess = req.session.idx;
  console.log(sess);
  if(sess!=undefined){
  models.user.findAll({
    where:{user_id:sess}
  }).then(result =>{ 
    console.log(result[0].dataValues.id),
  res.render("board_create", {user_info:result[0].dataValues.id});
  })
}
else res.render('error',{message: ' 잘못된 접근입니다. ', error:{status:' 권한 범위에 없는 요청사항 '}});
});


router.post('/create_process', function (req, res, next) {
  let sess = req.session;
  let body = req.body;
  console.log("user_id에 들어가는 값 : ",body.inputUserID);
  models.post.create({
    title: body.inputTitle,
    user_id: body.inputUserID,
    content: body.inputContent,
    views: 0
  })
    .then(result => {
      console.log("데이터 추가 완료");
      res.redirect("/board/list/1");
    })
    .catch(err => {
      console.log("데이터 추가 실패");
    })
});

router.get('/detail/:id', function (req, res, next) {
  let postID = req.params.id;
  var sess = req.session;
  db.query(`SELECT id,nickname FROM users`, function (err, users_info) {
    console.log("req.parmas.id의 값은 : ", postID);

    
  models.post.findOne({
    where: { id: postID }
  })
  .then(result => {
    models.post.update({views: result.views+1},{
      where: { id: postID }
    }).then(result3 => { 
    models.reply.findAll({
      where:{postId:postID}
    }).then(result2 =>{ 
      console.log("sess로 보내지는 값 : ", sess.idx),
    res.render("board_detail", {
      post: result,replies:result2,users:users_info,sess: sess.idx,ssnum: sess.idnum
    });
    })
  })
  })
});
});


router.get('/update/:id', function(req, res, next) {
  
  let postID = req.params.id;
  models.post.findOne({
    where: {id: postID}
  })
  .then( result => {
    res.render("board_update", {
      post: result,session:req.session.nickname
    });
  })
  .catch( err => {
    console.log("데이터 조회 실패");
  });
});

router.put('/update_process/:id', function (req, res, next) {
  let body = req.body;
  let postID = req.params.id;

  models.post.update({
    title: body.editTitle,
    writer: body.editWriter,
    content: body.editContent
  },{
    where : { id : postID }
  })
    .then(result => {
      console.log("데이터 수정 완료");
      res.redirect("/board");
    })
    .catch(err => {
      console.log("데이터 수정 실패");
    })
});
router.delete('/delete_process/:id', function(req, res, next) {
  console.log("board에 프로세스까지는 옴")
  let postID = req.params.id;

  models.post.destroy({
    where: {id: postID}
  })
  .then( result => {
    res.redirect("/board")
  })
  .catch( err => {
    console.log("데이터 삭제 실패");
  });
});

router.delete('/reply_delete/:id/:pid', function(req,res,next){
let replyID = req.params.id; // reply의 아이디값이 들어옴
let postID = req.params.pid;
var url = '/board/detail/'+postID;
console.log("req.params : ",req.params);

models.reply.destroy({
  where: {id:replyID}
})
.then(
  res.redirect(url))
.catch( err => {
  console.log("데이터 삭제 실패");


});

});

router.post('/reply_process', function (req, res, next) {
  var redirect_url='';
  let body = req.body;
  db.query(`SELECT id,nickname FROM users WHERE user_id=?`,[body.replyWriter], function (err, users_info) {
  
  
  console.log("users_info값은 : ",users_info[0].id);
  console.log("reply_process에 들어온 req.body =",req.body);

  models.reply.create({
    postId : body.replyPostId,
    user_id: users_info[0].id,
    content: body.replyContent
  })
    .then(result => {
      redirect_url="/board/detail/"+String(result.postId);
      res.redirect(redirect_url);
      console.log("데이터 추가 성공");
    })
    .catch(err => {
      console.log("데이터 추가 실패");
    })
  });
});


module.exports = router;