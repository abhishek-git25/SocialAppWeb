const Post = require("../models/posts")
const User = require('../models/user');



module.exports.home = async function (req, res) {

    try {

        let posts = await Post.find({})
        .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                },
                populate : {
                    path : 'likes'
                }
            }).populate('likes')
            .populate('comments');

        let users = await User.find({});
        return res.render('home', {
            title: 'Codeial | Home',
            posts: posts,
            all_users: users
        })

    } catch (error) {
        console.log(error, 'error');
    }

}