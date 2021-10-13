const db = require('../config/db')

exports.login = async (req,res,next)=>{

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
  
  }