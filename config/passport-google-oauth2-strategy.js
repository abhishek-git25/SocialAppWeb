const passport = require('passport');
const gooleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment')


// tell passport to use a new strategy for google login

passport.use(new gooleStrategy({
        clientID : env.google_client_ID,
        clientSecret : env.google_client_secret,
        callbackURL : env.google_client_secret,
},

   function(accessToken , refreshToken, profile , done){
    // find a user
            User.findOne({email : profile.emails[0].value }).exec()
            .then((result) =>{
                if(result){
                    // if found set the user as req.user
                    return done(null , result)
                }else{

                    // if not found create the user and set it as req.user
                    User.create({
                        name : profile.displayName,
                        email : profile.emails[0].value,
                        password : crypto.randomBytes(20).toString('hex')
                    }, function(err , user){
                        if(err){
                            console.log("error in creating user");
                            return;
                        }
                        return done(null , user)
                    })
                }
            })
            .catch((error) =>{
                console.log("error google strategy passport" , error);
                return;
            })
   }
));