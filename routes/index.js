var express = require('express');
var router = express.Router();
var db = require('../config/db')
var mysql = require('mysql2/promise')
const { NotFound } = require('http-errors');
const {body,validationResult} = require('express-validator');
const {register} = require('../controllers/registerController')
const {login} = require('../controllers/loginController')
const auth = require('../middleware/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'AHB JOBS' , user :""});
});


//login - Method: GET

router.get('/login',(req,res,next)=>{
  res.render('login');
})



//login - Method: POST

router.post('/login',[
  body('email',"invalid Email address")
  .notEmpty()
  .trim()
  .isEmail()

], login)

router.get('/register',(req,res,next)=>{
  res.render('register')
})

router.post('/register',[
  body('email',"invalid Email address")
  .notEmpty()
  .trim()
  .isEmail()

],  register);

router.post("/welcome",auth,(req,res)=>{
  res.status(200).send("Welcome 🙌 ");
});

module.exports = router;
