const express = require('express');
// const router = express.Router()

const router = express.Router();
const passport = require('passport');


const usersController = require('../controllers/users_controller')

router.get('/users/profile/:id' , passport.checkAuthentication ,  usersController.profile);
router.post('/users/update/:id' , passport.checkAuthentication , usersController.update)
router.get('/signup' , usersController.signup);
router.get('/signin' ,  usersController.singIn);
router.post('/create' , usersController.create);
router.post('/create-session' ,passport.authenticate(
    'local',
    {failureRedirect : '/signin'},
), usersController.createSession);

// router.post('/create-session' , passport.authenticate(
//     'local',
//     {failureRedirect : '/signin'},

// ),usersController.createSession );

router.get('/auth/google', passport.authenticate('google',  {scope : ['profile' , 'email']}));
router.get('/auth/google/callback' , passport.authenticate('google' , {failureRedirect : '/signin'}) , usersController.createSession)


router.get('/sign-out' , usersController.destroySession)

module.exports =  router;
