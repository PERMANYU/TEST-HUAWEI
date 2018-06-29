// var express = require('express');
// var router = express.Router();

// router.get('/', function(req, res, next) {
//   console.log('users',req.session);
//   if(!req.session.username) res.send({error:1,msg:'未登录'});
//   else res.send({error:0,name:'库数据'});
//   //mysql||mongoDb  兜一圈||https.request('代理数据')
//   // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//   // res.setHeader('Access-Control-Allow-Credentials', true);
//   // res.send(data);//给你数据
// });

// module.exports = router;

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(444)
  console.log(req.session)
  res.send(req.session)
});

module.exports = router;

