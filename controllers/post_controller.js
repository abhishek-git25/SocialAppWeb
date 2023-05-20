const Post = require('../models/posts')
const comment = require('../models/comment')
const Like = require('../models/likes');

module.exports.create = async function (req, res) {
    try {
       let post =  await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        if(req.xhr){
            return res.status(200).json({
                data : {
                    post : post
                },
                message : 'Post Created'
            })
        }
        req.flash('success' , 'Post publish!')
        return res.redirect('back')

    } catch (error) {
        req.flash('error' ,error)
        console.log(error, "error");
        return;
    }
}


module.exports.destroy = async function (req, res) {
    let posts = await Post.findById(req.params.id)
    try {
        if (posts.user == req.user.id) {

            await Like.deleteMany({ likeAble : posts , onModel : 'Post'  });
            await Like.deleteMany({_id : {$in : posts.comments}})
            posts.deleteOne();
            await comment.deleteMany({ post: req.params.id })


            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id : req.params.id,
                    },
                    message : "Post deleted successfully"
                })
            }

            req.flash('success' , 'Post and associated comments deleted')
            return res.redirect('back');
        } else {
            req.flash('error' , 'You cannot delete this post')
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error' , error)
        console.log(error , "error");
    }
}