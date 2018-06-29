var express = require('express');
var router = express.Router();
let mongodb = require('mongodb');
let url = require("url")
let cookieSession = require('cookie-session');
let app = express();
app.use(cookieSession({
  keys: ['aa','bb','cc'],
  maxAge:1000 * 60 * 60 * 24// 24 hours
}));


/* GET users listing. */
router.get('/', function(req, res, next) {

  let mongodbCt = mongodb.MongoClient;
  let address = `mongodb://localhost:27017`;
  console.log(req.url);
  let params = url.parse(req.url, true).query;//解析数据 获得Json对象
  console.log(params);
  let username = params.yhm;
  let password = params.mima;

  req.session['user']=username;
  // console.log(req.session)
  mongodbCt.connect(address,(err,client)=>{
    if(err) res.send({error:1,msg:'database connect error'});
    let db = client.db('yu');
    // console.log(db)
    let user = db.collection('user');
    user.insert({"username": username,"password": password});
    res.send("1")
  });
});

module.exports = router;
