const express = require('express');
const router= express.Router();

const likesController = require('../controllers/likes_controller');


router.post('/likes/toggle' , likesController.toggleLike);

module.exports = router;