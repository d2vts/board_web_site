var express = require('express');
var router = express.Router();
var models = require('../models');

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

router.get('/list', function (req, res, next) {
  res.redirect('/board/list/1');
});

router.get('/list/1', function (req, res, next) {
  let session = req.session;
  var sess = req.session.idx;
  console.log("sess : ",sess);
  models.post.findAll().then(result => {
    res.render("board_list", {
      posts: result,sess:sess
    });
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
  res.render('board_create', { title: 'Express' });
});

router.post('/create_process', function (req, res, next) {
  let body = req.body;
  models.post.create({
    title: body.inputTitle,
    writer: body.inputWriter,
    content: body.inputContent,
    views: 0
  })
    .then(result => {
      console.log("데이터 추가 완료");
      res.redirect("/board");
    })
    .catch(err => {
      console.log("데이터 추가 실패");
    })
});

router.get('/detail/:id', function (req, res, next) {
  let postID = req.params.id;
    console.log("req.parmas.id의 값은 : ", postID);
  models.post.findOne({
    where: { id: postID }
  }).then(result => {
    models.reply.findAll({
      where:{postId:postID}
    }).then(result2 =>{ 
      console.log(result2),
    res.render("board_detail", {
      post: result,replies:result2
    });
    })
  })
});


router.get('/update/:id', function(req, res, next) {
  let postID = req.params.id;
  models.post.findOne({
    where: {id: postID}
  })
  .then( result => {
    res.render("board_update", {
      post: result
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
  }).
  models.reply.destroy({
    where: {postId: postID}
  })
  .then( result => {
    res.redirect("/board")
  })
  .catch( err => {
    console.log("데이터 삭제 실패");
  });
});

router.post('/reply_process', function (req, res, next) {
  let body = req.body;
  var redirect_url='';
  console.log("reply_process에 들어온 req.body =",req.body)
  models.reply.create({
    postId : body.replyPostId,
    writer: body.replyWriter,
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


module.exports = router;