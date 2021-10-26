const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const con = require('../config/db').promise();
const bcrypt = require('bcryptjs');

exports.login = async (req,res,next)=>{

  const errors = await validationResult(req);

  console.log(req.body.email)
  console.log(errors,'errors on validation')
  if(!errors.isEmpty()){
    
    return res.status(422).json({ errors: errors.array() });
  }

    
  try { 
    const { email, pass }=req.body;
    
    const [row] = await con.execute(
      `SELECT id , email , password FROM user WHERE email = '${email}';`
    )
    
  
    if (row.length<=0){
      return res.render('message',{message:' user not  found, try to register',error: Error})
    }  
    const passMatch = await bcrypt.compare(pass,row[0].password)

    if(!passMatch){
    return res.render('message',{message:' wrong pass',error: Error})
    }


    const Thetoken = jwt.sign(
      {id:row[0].id,email:row[0].email},process.env.SECRET_KEY,{ expiresIn: '1h' }
    )

    // return res.render('index',{user: row[0].email}).json({
      // token: Thetoken 
    // })
    
    return res.status(201).json({email:row[0].email,token:Thetoken})
  }
       

  catch (error) {
    throw error
    }
  
}