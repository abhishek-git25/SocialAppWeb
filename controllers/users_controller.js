// const passport = require('passport');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function (req, res) {
    User.findById(req.params.id)
        .then((results) => {
            return res.render('users', {
                title: "Profile",
                profile_user: results
            })
        })
}

module.exports.update =  async function(req ,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id , req.body)
    //     .then((result) =>{
    //         return res.redirect('back')
    //     })
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id == req.params.id){
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res , function(err){
                if(err){
                    console.log('Multer error' , err);
                }
                console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    // saving the path of the uploaded file in the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save()
                return res.redirect('back')
            })
        } catch (error) {
            req.flash('error' , error);
            return res.redirect('back')
        }
    }else{

    }
}


module.exports.signup = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/profile')
    }
    return res.render('user_signup', {
        title: "Codeial : Sign up"
    })
}

module.exports.create = function (req, res) {

    if (req.body.password != req.body.confirmPassword) {
        console.log("Password did  not match");
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email })
        .then((foundUser) => {
            if (!foundUser) {
                User.create(req.body)
                    .then((result) => {
                        console.log(result);
                        return res.redirect('/signup')
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } else {
                console.log("User exists");
                return res.redirect('/signup')
            }
        })
        .catch((error) => {
            //When there are errors We handle them here

            console.log(err);
            res.send(400, "Bad Request");
        });





}

module.exports.singIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    return res.render('user_signin', {
        title: "Codeial : Sign in"
    })
}



module.exports.createSession = function (req, res) {
    req.flash('success' , 'Logged in Successfully')
    console.log("hello");
    return res.redirect('/');
}

module.exports.destroySession = function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success' , 'You have logged out!')
        res.redirect('/')
    });

}