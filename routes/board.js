var express = require('express');
var router = express.Router();
var models = require('../models');
var db = require('../lib/db');

router.get('/', function (req, res, next) {
  res.redirect('/board/list/1');
});

router.get('/list/:page', function (req, res, next) {

  if (req.query._query == undefined) {
    var sess = req.session;
    var pageNow = req.params.page; // querystring으로 받아낸 현재 페이지 값
    pageNow = parseInt(pageNow, 10); // Integer형식으로 변경한 현재 페이지 값
    var listCnt = 10; // 한 페이지에 출력할 게시물 수
    var pageCnt = 10; // 한 화면에 출력할 페이지의 수
    var pageBegin = (pageNow - 1) * listCnt;

    
    db.query(`SELECT id,nickname FROM users`, function (err, users_info) {
      db.query(`SELECT COUNT(*) AS cnt from posts`,
        function (err, result) {

          var totalCnt = result[0].cnt; // 게시물의 총 개수
          var totalPage = Math.floor(totalCnt / listCnt); // 총 페이지의 수
          if (totalCnt % listCnt > 0) totalPage++; // 페이지 나머지가 존재한다면 총 페이지의 수 +1
          if (totalPage < pageNow) pageNow = totalPage; // 현재 페이지가 총 페이지의 수보다 크다면 총 페이지 번호로 강제 치환
          var startPage = Math.floor((pageNow - 1) / pageCnt) * pageCnt + 1; // 화면에 표시할 시작페이지  ((page - 1) / 10) * 10 + 1;
          var endPage = startPage + pageCnt - 1; // 화면에 표시할 끝페이지
          console.log("if문에 들어가기 전의 endPage 값 : ", endPage);
          console.log("totalCnt의 값 : ", totalCnt); // 게시물이 11개라서 11이라고 뜸
          if (endPage > totalPage) { endPage = totalPage; }  //  totalPage가 23이라고 했을때 endPage가 30이 되면 안되기 때문에 강제 보정
          console.log("pageNow(현재페이지): ", pageNow);
          console.log("listCnt(한 페이지에 출력할 게시물 수) : ", listCnt);
          console.log("pageCnt(한 화면에 출력할 페이지의 수) : ", pageCnt);
          console.log("totlaCnt(총 게시물의 개수) : ", totalCnt);
          console.log("totalPage(총 페이지의 개수) : ", totalPage);
          console.log("startPage(화면에 표시할 시작페이지) : ", startPage);
          console.log("endPage(화면에 표시할 끝페이지) : ", endPage);
          db.query(`SELECT * FROM posts ORDER BY createdAt desc limit ${pageBegin},${listCnt}`, function (err, result) {
            var fromRouterData = {
              post: result, pageNow: pageNow, listCnt: listCnt,
              pageCnt: pageCnt, totalPage: totalPage, startPage: startPage,
              endPage: endPage, sess: sess, users: users_info
            };
            res.render("board_list", fromRouterData);

          });
        });
    });
  }
  else {
    console.log("#######################검색했을때##########################");
    console.log("req.query.find_type : ",req.query.find_type);
    var sess = req.session;
    var pageNow = req.params.page; // querystring으로 받아낸 현재 페이지 값
    pageNow = parseInt(pageNow, 10); // Integer형식으로 변경한 현재 페이지 값
    var listCnt = 10; // 한 페이지에 출력할 게시물 수
    var pageCnt = 10; // 한 화면에 출력할 페이지의 수
    var pageBegin = (pageNow - 1) * listCnt;
    db.query(`SELECT id,nickname FROM users`, function (err, users_info) {
     
      var writer_post_user_id ='';
      db.query(`SELECT COUNT(*) AS cnt from posts`,
        function (err, result) {
          var totalCnt = result[0].cnt; // 게시물의 총 개수
          var totalPage = Math.floor(totalCnt / listCnt); // 총 페이지의 수
          if (totalCnt % listCnt > 0) totalPage++; // 페이지 나머지가 존재한다면 총 페이지의 수 +1
          if (totalPage < pageNow) pageNow = totalPage; // 현재 페이지가 총 페이지의 수보다 크다면 총 페이지 번호로 강제 치환
          var startPage = Math.floor((pageNow - 1) / pageCnt) * pageCnt + 1; // 화면에 표시할 시작페이지  ((page - 1) / 10) * 10 + 1;
          var endPage = startPage + pageCnt - 1; // 화면에 표시할 끝페이지
          console.log("if문에 들어가기 전의 endPage 값 : ", endPage);
          console.log("totalCnt의 값 : ", totalCnt); // 게시물이 11개라서 11이라고 뜸
          if (endPage > totalPage) { endPage = totalPage; }  //  totalPage가 23이라고 했을때 endPage가 30이 되면 안되기 때문에 강제 보정
          console.log("pageNow(현재페이지): ", pageNow);
          console.log("listCnt(한 페이지에 출력할 게시물 수) : ", listCnt);
          console.log("pageCnt(한 화면에 출력할 페이지의 수) : ", pageCnt);
          console.log("totlaCnt(총 게시물의 개수) : ", totalCnt);
          console.log("totalPage(총 페이지의 개수) : ", totalPage);
          console.log("startPage(화면에 표시할 시작페이지) : ", startPage);
          console.log("endPage(화면에 표시할 끝페이지) : ", endPage);
          
          for(var i = 0 ; i < users_info.length ; i++){
          if(users_info[i].nickname==req.query._query){
            writer_post_user_id=users_info[i].id;
         }
        }

          var writer_db_query = `SELECT * FROM posts WHERE user_id ='${writer_post_user_id}' ORDER BY createdAt desc limit ${pageBegin},${listCnt}`;
          var content_db_query = `SELECT * FROM posts WHERE content like '%${req.query._query}%' ORDER BY createdAt desc limit ${pageBegin},${listCnt}`;
          var title_db_query = `SELECT * FROM posts WHERE title like '%${req.query._query}%' ORDER BY createdAt desc limit ${pageBegin},${listCnt}`;
          var contentitle_db_query = `SELECT * FROM posts WHERE content like '%${req.query._query}%' or title like '%${req.query._query}%' ORDER BY createdAt desc limit ${pageBegin},${listCnt}`;
          var input_db_query=content_db_query;

          console.log("input_db_query : ",input_db_query);

          if(req.query.find_type=='title'){
          input_db_query=title_db_query;
          } else if(req.query.find_type=='content'){
            input_db_query=content_db_query;
          } else if(req.query.find_type=='contentitle'){
            input_db_query=contentitle_db_query;
          } else{ //writer
            input_db_query=writer_db_query;
          }
          
          
          db.query(`${input_db_query}`, function (err, result) {

            console.log("result:", result);
            var fromRouterData = {
              post: result, pageNow: pageNow, listCnt: listCnt,
              pageCnt: pageCnt, totalPage: totalPage, startPage: startPage,
              endPage: endPage, sess: sess, users: users_info
            };
            res.render("board_list", fromRouterData);

          });
        });
    });

  }

});

router.get('/create', function (req, res, next) {
  let sess = req.session.idx;
  console.log(sess);
  if (sess != undefined) {
    models.user.findAll({
      where: { user_id: sess }
    }).then(result => {
      console.log(result[0].dataValues.id),
        res.render("board_create", { user_info: result[0].dataValues.id });
    })
  }
  else res.render('error', { message: ' 잘못된 접근입니다. ', error: { status: ' 권한 범위에 없는 요청사항 ' } });
});


router.post('/create_process', function (req, res, next) {
  let sess = req.session;
  let body = req.body;
  console.log("user_id에 들어가는 값 : ", body.inputUserID);
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
        models.post.update({ views: result.views + 1 }, {
          where: { id: postID }
        }).then(result3 => {
          models.reply.findAll({
            where: { postId: postID }
          }).then(result2 => {
            console.log("sess로 보내지는 값 : ", sess.idx),
              res.render("board_detail", {
                post: result, replies: result2, users: users_info, sess: sess.idx, ssnum: sess.idnum
              });
          })
        })
      })
  });
});


router.get('/update/:id', function (req, res, next) {

  let postID = req.params.id;
  models.post.findOne({
    where: { id: postID }
  })
    .then(result => {
      res.render("board_update", {
        post: result, session: req.session.nickname
      });
    })
    .catch(err => {
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
  }, {
    where: { id: postID }
  })
    .then(result => {
      console.log("데이터 수정 완료");
      res.redirect("/board");
    })
    .catch(err => {
      console.log("데이터 수정 실패");
    })
});
router.delete('/delete_process/:id', function (req, res, next) {
  console.log("board에 프로세스까지는 옴")
  let postID = req.params.id;

  models.post.destroy({
    where: { id: postID }
  })
    .then(result => {
      res.redirect("/board")
    })
    .catch(err => {
      console.log("데이터 삭제 실패");
    });
});

router.delete('/reply_delete/:id/:pid', function (req, res, next) {
  let replyID = req.params.id; // reply의 아이디값이 들어옴
  let postID = req.params.pid;
  var url = '/board/detail/' + postID;
  console.log("req.params : ", req.params);

  models.reply.destroy({
    where: { id: replyID }
  })
    .then(
      res.redirect(url))
    .catch(err => {
      console.log("데이터 삭제 실패");


    });

});

router.post('/reply_process', function (req, res, next) {
  var redirect_url = '';
  let body = req.body;
  db.query(`SELECT id,nickname FROM users WHERE user_id=?`, [body.replyWriter], function (err, users_info) {


    console.log("users_info값은 : ", users_info[0].id);
    console.log("reply_process에 들어온 req.body =", req.body);

    models.reply.create({
      postId: body.replyPostId,
      user_id: users_info[0].id,
      content: body.replyContent
    })
      .then(result => {
        redirect_url = "/board/detail/" + String(result.postId);
        res.redirect(redirect_url);
        console.log("데이터 추가 성공");
      })
      .catch(err => {
        console.log("데이터 추가 실패");
      })
  });
});

module.exports = router;