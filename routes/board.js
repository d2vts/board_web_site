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
  models.post.findAll().then(result => {
    res.render("board_list", {
      posts: result
    });
  });
});

router.get('/list/:page', function (req, res, next) {
  var page = req.params.page;
  models.post.findAll().then(result => {
    res.render("board_list", {
      posts: result
    });
  });
});


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
  console.log("detail - postId : [", postID,"] selected ")
  models.post.findOne({
    where: { id: postID }
  }).then(result => {
    res.render("board_detail", {
      post: result
    });
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

module.exports = router;