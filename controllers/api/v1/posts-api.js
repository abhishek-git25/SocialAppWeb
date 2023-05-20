const Post = require('../../../models/posts')
const comment = require('../../../models/comment')


module.exports.index = async function (req, res) {
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    return res.json(200, {
        message: 'List of posts',
        posts: posts
    })
}

module.exports.destroy = async function (req, res) {
    let posts = await Post.findById(req.params.id)
    try {
        if (posts.user == req.user.id) {
            posts.deleteOne();
            await comment.deleteMany({ post: req.params.id })


            return res.json(200, {
                message: 'Post and associated comments deleted successfully'
            })
        } else {
            return res.json(401, {
                message: "You cannot delete this post"
            })
            // req.flash('error' , 'You cannot delete this post')
        }
    } catch (error) {
        // req.flash('error' , error)
        console.log(error, "error");
        return res.json(500, {
            message: 'Internal Server Error'
        })
    }
}