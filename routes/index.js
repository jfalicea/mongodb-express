var express = require('express');
var router = express.Router();
//1. get the mongo node module
const mongodb = require('mongodb')
//2. create a mongodbclient 
const mongoClient = mongodb.MongoClient;
// console.log(mongoClient)
//3. create a url to our mongo server 

const mongoURL = `mongodb://localhost:27017`
const databaseName = 'electric';
let db; //make a global var so that all routes can use it. 
//4. connect express to mongo db. 
mongoClient.connect(mongoURL,{ useNewUrlParser: true },(err, database)=>{
  if(err) throw err;
  db = database.db(databaseName);
  // console.log('db',db )
  console.log('Connected to mongo!')
})

/* GET home page. */
router.get('/', function(req, res, next) {
  db.collection('students').find().toArray((err,results)=>{
    if(err) throw err;
    console.log(results)
    res.render('index', { title: 'Express', students: results });
  })
});


router.post('/form_submit', (req,res,next)=>{
  db.collection('students').insertOne({
    name: req.body.student
  })
  res.redirect('/')
})

module.exports = router;
