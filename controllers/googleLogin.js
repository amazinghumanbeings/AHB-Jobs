const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv').config();
const con = require('../config/db').promise();

module.exports = function(passport){
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                callbackURL: '/auth/google/callback',
            },
            async (accessToken,refreshToken,profile,done)=>{
                //user data from google
                console.log('\n',profile)
                const newUser = {
                    googleID: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastname: profile.name.familyName,
                    image: profile.photos[0].value,
                    email: profile.emails[0].value
                }

                try {
                    
                    const email = newUser.email

                    let [user] = await con.execute(
                        `SELECT id , email , password FROM user WHERE email = '${email}';`
                      )
                    
                    if (!user[0]==undefined) {
                        return done(null, false);
                      }

                    else if (user.length<=0){
                        var sqlq="INSERT INTO `user`(`username`,`email`,`password`,`name`,`create_time`)VALUES ('test','"+email+"','default','tester',CURRENT_TIME());"
                        user = await con.execute(sqlq);
                        done(null,profile)

                    }else if (user[0]){
                        done(null,profile)
                    }


                } catch (err) {
                    console.log(err)
                }
            }
        )
    )

    // used to serialize the user for the session
    passport.serializeUser((profile, done) => {
      done(null, profile)
    })
  
    // used to deserialize the user
    passport.deserializeUser((profile, done) => {
        done(null, profile)
    })
}