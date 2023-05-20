const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');




router.get('/' , homeController.home);
router.use('/' , require('./user_routes'));
router.use('/' , require("./post_routes"))
router.use('/' , require('./comments_route'));
router.use('/' , require('./likes_routes'));

router.use('/api' , require('./api'));
console.log('routes');

module.exports = router;