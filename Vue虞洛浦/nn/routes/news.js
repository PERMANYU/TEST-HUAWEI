let express = require("express");
let router = express.Router();
let mongodb = require('mongodb');


/* GET home page. */
router.get('/', function(req, res, next) {
    // console.log(1)
  let mongodbCt = mongodb.MongoClient;
  let address = `mongodb://localhost:27017`;
  // console.log(typeof start,typeof count);
  mongodbCt.connect(address,(err,client)=>{
    if(err) res.send({error:1,msg:'database connect error'});
    let db = client.db('yu');
    // console.log(db)
    let news = db.collection('news');
    news.find().toArray((err,result)=>{
      if(err){
        res.send({error:1,msg:'database find error'});
      }else{
        res.send(result);
        // console.log(result)
        // client.close();
      }
    });
    
  });
});
module.exports = router;