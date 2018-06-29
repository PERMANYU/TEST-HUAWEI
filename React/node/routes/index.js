var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Credentials', true);
  let mongodbCt = mongodb.MongoClient;
  let address = `mongodb://localhost:27017`;
  let start = req.query.start-0;
  let count = req.query.count-0;
  // console.log(typeof start,typeof count)
  mongodbCt.connect(address,(err,client)=>{
    if(err) res.send({err:1,msg:'database connect error'});
    let db = client.db('index');
    let blog = db.collection('json1');
    blog.find().toArray((err,result)=>{
      if(err){
        res.send({error:1,msg:'database find error'});
      }else{
        res.render(result);
        //client.close();
      }
    });
  });
});

module.exports = router;
