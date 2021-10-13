var express = require('express');
var router = express.Router();
var db = require('../config/db')
var mysql = require('mysql2/promise')
const { NotFound } = require('http-errors');
const {register} = require('../controllers/registerController')
const {login} = require('../controllers/loginController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'AHB JOBS' , user :""});
});


//login - Method: GET

router.get('/login',(req,res,next)=>{
  res.render('login');
})



//login - Method: POST

router.post('/login', login)

router.get('/register',(req,res,next)=>{
  res.render('register')
})

router.post('/register',register);

module.exports = router;
