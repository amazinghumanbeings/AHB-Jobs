var express = require('express');
var router = express.Router();
var db = require('../config/db')
var mysql = require('mysql')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'AHB JOBS' });
});


//login - Method: GET

router.get('/login',(req,res,next)=>{
  res.render('login');
})



//login - Method: POST

router.post('/login',(req,res,next)=>{

  var sqlq="INSERT INTO `user`(`username`,`email`,`password`,`name`,`create_time`)VALUES ('test','"+req.body.email+"','"+req.body.pass+"','tester',CURRENT_TIME());"
  db.getConnection(function(err,conn){
    conn.query(sqlq,function(err,rows,fields){
      
      if(err) throw err
      console.log('r',rows,'f',fields)  
  })
      db.releaseConnection(conn);
  })
  
  res.redirect('/')
  
  
})

module.exports = router;
