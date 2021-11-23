var express                     = require('express');
var router                      = express.Router();
const {ensureAuth, ensureGuest} = require('../middleware/gAuth');
const sendEmail                      = require('../controllers/mailController');

const { NotFound } = require('http-errors');
const {body,validationResult} = require('express-validator');



router.get('/l',(req,res,next)=>{
  res.render('launch');
})

/* GET home page. */
router.get('/',ensureGuest, function(req, res, next) {
  res.render('index', { title: 'AHB JOBS' , user :""});
});

router.get('/welcome',ensureAuth,async (req,res)=>{
    // mail('testUser',req.user.email);
    // console.log('user email',req.user.email);
    sendEmail(req.user.email)
    
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
