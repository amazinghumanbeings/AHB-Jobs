const con = require('../config/db').promise();

exports.register = async (req,res,next)=>{
    try {
        const {email,pass} = req.body
        const [row] = await con.execute(
            "SELECT `email` FROM  `user` WHERE `email` = ?",
            [email]
        );

        console.log(row)
        if(row.length>0){
            return res.status(201).render('message',{message:'Email already in use',error:Error})
        }

        var sqlq="INSERT INTO `user`(`username`,`email`,`password`,`name`,`create_time`)VALUES ('test','"+email+"','"+pass+"','tester',CURRENT_TIME());"
    
        await con.execute(sqlq)
        
        return res.redirect('/') 
        
    

    } catch (error) {
        if (error) throw error
    }


}