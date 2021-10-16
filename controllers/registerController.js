const con = require('../config/db').promise();
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

exports.register = async (req,res,next)=>{
    const errors = await validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const {email,pass} = req.body
        const hashpass = await bcrypt.hash(pass,12);
        console.log(hashpass,'hashpass')
        const [row] = await con.execute(
            "SELECT `email` FROM  `user` WHERE `email` = ?",
            [email]
        );

        console.log(row)
        if(row.length>0){
            return res.status(201).render('message',{message:'Email already in use',error:Error})
        }

        var sqlq="INSERT INTO `user`(`username`,`email`,`password`,`name`,`create_time`)VALUES ('test','"+email+"','"+hashpass+"','tester',CURRENT_TIME());"
    
        await con.execute(sqlq)
        
        return res.redirect('/') 
        
    

    } catch (error) {
        if (error) throw error
    }


}