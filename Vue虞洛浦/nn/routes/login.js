// var express = require('express');
// var router = express.Router();

// /* router.get('/', function(req, res){
//   // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//   // res.setHeader('Access-Control-Allow-Credentials', true);
//   console.log('cookies服务',req.query);

  
//   //兜库，看有无用户名,有才种,并取用户信息

//   req.session.username=req.query.username;//种
//   res.send({error:0,msg:'成功',data:{a:'用户信息'}});

// }); */
// router.get('/', function(req, res){
//   // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//   // res.setHeader('Access-Control-Allow-Credentials', true);
//   console.log('获取cookies',req.session);
//   console.log('获取前端提交信息',req.query);
//   //兜库，看有无用户名,有才种,并取用户信息
//   // console.log(req.session);
//   req.session.username=req.query.username;//种  库里面用户的 ID
//   console.log(req.session);
//   res.send({error:0,msg:'成功',data:{a:'用户信息'}});

// });

// module.exports = router;


var express = require('express');
var router = express.Router();
let mongodb = require('mongodb');
let url = require("url")


/* GET users listing. */
router.get('/', function(req, res, next) {
    // res.setHeader("Access-Control-Allow-Credentials",true)
  let mongodbCt = mongodb.MongoClient;
  let address = `mongodb://localhost:27017`;
//   console.log(req.url);
  let params = url.parse(req.url, true).query;//解析数据 获得Json对象
//   console.log(params);
  let username = params.yhm;

    // req.session['user']=username;
    console.log(333)
 mongodbCt.connect(address,(err,client)=>{
    let db = client.db('yu');
    // console.log(db)
    let user = db.collection('user');
    let searchname = {"username":username};
     user.find(searchname,function(err, cursor){
        let result = []
       cursor.each(function(err,doc){
        if(err)
         throw err;
            if (doc === null) {
                req.session.user=username;
                res.send(result);
                return;
            }
            result.push(doc.username)
        });
    });
  });
 
});

module.exports = router;
