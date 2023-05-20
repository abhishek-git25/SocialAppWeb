const express = require('express');
const router = express.Router();
// const postsApi = require("../../../controllers/api/v1/posts-api")



router.use('/posts' , require('./posts'));
router.use('/users' , require('./users'));



module.exports = router;