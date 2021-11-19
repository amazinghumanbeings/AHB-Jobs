var express = require('express');
var router = express.Router();
const {ensureAuth, ensureGuest} = require('../middleware/gAuth');
const nodemailer = require('nodemailer');

const { NotFound } = require('http-errors');
const {body,validationResult} = require('express-validator');


/* GET home page. */
router.get('/',ensureGuest, function(req, res, next) {
  res.render('index', { title: 'AHB JOBS' , user :""});
});

router.get('/welcome',ensureAuth,async (req,res)=>{
    console.log('user email',req.user.email);

    let transporter = nodemailer.createTransport({
      service:'gmail',
      auth: {
        user:'adminMAIL',
        pass:'adminMailPass'
      }
    }); 

    var mailOptions = {
      from: 'adminMail',
      to: req.user.email,
      subject:'testing node mail',
      text:'testing node mail for ahb jobs'
    };

    transporter.sendMail(mailOptions,(error,info)=>{
      if(error){
        console.log(error);
      }else{
        console.log('Email sent',+info.response);
      }
    });
    res.json({user:req.user})
 })

 
router.get('/logout',(req,res)=>{
  req.logOut()
  res.redirect('/')
})

/*

//login - Method: GET

router.get('/login',ensureGuest,(req,res,next)=>{
  res.render('login');
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


*/
module.exports = router;
