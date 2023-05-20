const passport = require('passport');

const localStrategy = require('passport-local').Strategy;

// authentication using passport

const user = require("../models/user");
passport.use(new localStrategy({
    usernameField: 'email',
    passReqToCallback : true
},
    async function (req ,email, password, done) {
        try {
            const result = await user.findOne({ email });
            if (!result || result.password != password) {
                req.flash('error' , 'Invalid Username/Password');
                console.log("Invalid Username/Password");
                return done(null, false)
            }
            return done(null, result);

        } catch (error) {
            req.flash('error' , error)
            console.log("Error find the user =>> Passport");
            return done(error)
        }


        // .then((result)=>{
        //     if(!result || result.password  != password){
        //         console.log("Invalid Username/Password");
        //         return done(null , false)
        //     }
        //     return done(null, result);
        // })
        // .catch((err) =>{
        //     console.log("Error find the user =>> Passport");
        //     return done(err)
        // })
    }


))

passport.serializeUser(function (user, done) {
    done(null, user.id);
})

passport.deserializeUser(function (id, done) {
    user.findById(id)
        .then((result) => {
            return done(null, result)
        })
        .catch((err) => {
            console.log("Error in finding the user --> Passport");
            return done(err)
        })
})

passport.checkAuthentication = function(req , res , next){

    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/signin');
}

passport.setAuthenticatedUser = function(req , res , next){
    if(req.isAuthenticated()){
        //req.user contains the current signed user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;