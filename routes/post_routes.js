const express = require('express');
const router = express.Router();
const passport=  require('passport')

const postController =  require('../controllers/post_controller');

router.post('/post/create' ,passport.checkAuthentication, postController.create)
router.get('/post/destroy/:id' , passport.checkAuthentication , postController.destroy);


module.exports =  router