router.get('/board/:page', function(req, res, next) {
    var page = req.params.page;
    page = parseInt(page, 10);
    var size = 10;
    var begin = (page-1)*size;
    if(req.session.email === undefined){
      db.query(`select count(*) cnt from posts`,
        function(err, result){
          var cnt = result[0].cnt;
          var totalPage = Math.ceil(cnt / size);
          var pageSize = 10;
          var startPage = Math.floor((page-1) / pageSize)*pageSize + 1;
          var endPage = startPage + (pageSize - 1);
          console.log(totalPage+" "+startPage+" "+endPage);
          if(endPage > totalPage){
            endPage = totalPage;
          }
          var max = cnt - ((page-1)*size);
          db.query(`select * from posts order by createdAt desc limit ?,?`,
            [begin, size],
            function(err, result){
              var datas = {
                post : result,
                page: page,
                pageSize: pageSize,
                startPage: startPage,
                endPage: endPage,
                totalPage: totalPage,
                max: max,
                session:false
              };
              res.render("board", datas);
          });
      });
    }
    else{
      db.query(`select count(*) cnt from posts`,
        function(err, result){
          var cnt = result[0].cnt;
          var totalPage = Math.ceil(cnt / size);
          var pageSize = 10;
          var startPage = Math.floor((page-1) / pageSize)*pageSize + 1;
          var endPage = startPage + (pageSize - 1);
          console.log(totalPage+" "+startPage+" "+endPage);
          if(endPage > totalPage){
            endPage = totalPage;
          }
          var max = cnt - ((page-1)*size);
          db.query(`select * from posts order by createdAt desc limit ?,?`,
            [begin, size],
            function(err, result){
              var datas = {
                post : result,
                page: page,
                pageSize: pageSize,
                startPage: startPage,
                endPage: endPage,
                totalPage: totalPage,
                max: max,
                session:req.session
              };
              res.render("board", datas);
          });
      });
    }
  });