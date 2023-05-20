const express = require('express');
const router = express.Router();
const passport=  require('passport')

const commentsController =  require('../controllers/comments_controller');

router.post('/comments/create' ,passport.checkAuthentication, commentsController.create);
router.get('/comments/destroy/:id' , passport.checkAuthentication , commentsController.destory);


module.exports =  router