var express = require('express');
var router = express.Router();
var db = require('../config/db')
var mysql = require('mysql');
const { NotFound } = require('http-errors');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'AHB JOBS' , user :""});
});


//login - Method: GET

router.get('/login',(req,res,next)=>{
  res.render('login');
})



//login - Method: POST

router.post('/login', (req,res,next)=>{

  try {
    const { email, pass }=req.body;
    console.log(email,pass)
    db.getConnection( function(err,conn){
        conn.query(`SELECT email FROM user WHERE email = '${email}';`, function (err,rows,fields){
        if(err) throw err;
        try{ if ( email == rows[0].email){
          res.render('index',{user: rows[0].email})
        }
      }
      catch(error){
          res.render('message',{message:' user not  found, try to register',error: Error})
        }
      })    

  
      db.releaseConnection(conn);

      
    }) 
  } 
  catch (error) {
    throw error
  }

})

router.get('/register',(req,res,next)=>{
  res.render('register')
})

router.post('/register',(req,res,next)=>{
 
  try {

  const { email, pass }=req.body;
  db.getConnection( function(err,conn){
    var sqlq="INSERT INTO `user`(`username`,`email`,`password`,`name`,`create_time`)VALUES ('test','"+email+"','"+pass+"','tester',CURRENT_TIME());"
    
    conn.query(sqlq,function(err,rows,fields){
      
      if(err) throw err
      console.log('r',rows,'f',fields)  
      })
    })
  res.redirect('/')



} catch (error) {
  throw error  
}

  
})

module.exports = router;
