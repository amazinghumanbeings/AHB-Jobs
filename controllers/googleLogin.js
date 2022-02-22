const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv").config();
const db = require("../models");
const User = db.User;
const op = db.Sequelize.Op;

//Now not in use

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log("\n", refreshToken);
        //user data from google
        console.log("\n", profile);
        console.log("\n", profile._json.sub);

        const newUser = {
          name: profile.displayName,
          email: profile.emails[0].value,
          social_user_id: profile._json.sub,
        };

        try {
          //let [user] = await con.execute(
          //    `SELECT id , email , password FROM users WHERE email = '${email}';`
          //  )
          //
          //if (!user[0]==undefined) {
          //    return done(null, false);
          //  }

          //else if (user.length<=0){

          const [user, created] = await User.findOrCreate({
            where: {
              name: profile.displayName,
              email: profile.emails[0].value,
              social_user_id: profile._json.sub,
            },
          });

          // console.log('user\n',user)
          done(null, user.dataValues);

          //var sqlq="INSERT INTO `user`(`username`,`email`,`password`,`name`,`create_time`)VALUES ('test','"+email+"','default','tester',CURRENT_TIME());"
          //user = await con.execute(sqlq);
          // done(null,profile)

          // }else if (user[0]){
          //    done(null,profile)
          // }
        } catch (err) {
          console.log(err);
        }
      }
    )
  );

  // used to serialize the user for the session
  passport.serializeUser((profile, done) => {
    done(null, profile);
  });

  // used to deserialize the user
  passport.deserializeUser((profile, done) => {
    done(null, profile);
  });
};
