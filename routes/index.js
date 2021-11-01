var express = require('express');
var router = express.Router();
const {ensureAuth, ensureGuest} = require('../middleware/gAuth')
var db = require('../config/db')
var mysql = require('mysql2/promise')
const { NotFound } = require('http-errors');
const {body,validationResult} = require('express-validator');
const {register} = require('../controllers/registerController');
const {login} = require('../controllers/loginController');
const {auth} = require('../middleware/auth');

/* GET home page. */
router.get('/',ensureGuest, function(req, res, next) {
  res.render('index', { title: 'AHB JOBS' , user :""});
});


//login - Method: GET

router.get('/login',ensureGuest,(req,res,next)=>{
  res.render('login');
})

router.get('/welcome',ensureAuth,async (req,res)=>{
  res.render('welcome',{user:req.user});
 })

router.get('/logout',(req,res)=>{
  req.logOut()
  res.redirect('/login')
})
//login - Method: POST

router.post('/login',[
  body('email',"invalid Email address")
  .notEmpty()
  .trim()
  .isEmail()

], login)

router.get('/register',ensureGuest,(req,res,next)=>{
  res.render('register')
})

router.post('/register',[
  body('email',"invalid Email address")
  .notEmpty()
  .trim()
  .isEmail()

],  register);

//router.post("/welcome",auth,(req,res)=>{
//  res.status(200).send("Welcome 🙌 ");
//});
 
///

///


module.exports = router;
