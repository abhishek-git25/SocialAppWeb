const Comment =  require('../models/comment');
const Post =  require('../models/posts');
const commentsMailer = require('../mailer/comments-mailer');
const commentEmailWorker = require('../workers/comment_email_worker')
const queue = require('../config/kue')
const Like = require("../models/likes")

module.exports.create =  async function(req , res){
    try {
        let post = await Post.findById(req.body.post);
        console.log(req.body.post);
        if(post){
            let comment = await Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            })
            post.comments.push(comment);
            post.save();


      
            
            comment = await comment.populate('user' , 'name email');
            console.log(comment , "20");
            commentsMailer.newComment(comment)

            let job = queue.create('emails', comment).save(function (err) {
                if (err) {
                    console.log("error in sending to the queue", err);
                    return;
                }
                console.log('Job Enqued', job.id);
            })

            if(req.xhr){
                return res.status(200).json({
                    data :{
                        comment : comment
                    },
                    message : "Comment Published!"
                })
            
            }
            // req.flash('success' , 'Comments published');

            console.log("post");
            return res.redirect('/');
        }
    } catch (error) {
        req.flash('error' , error);
        return;
    }
    
}


module.exports.destory = async function(req, res){
    console.log(req.params , "my params 29");
   let comments = await Comment.findById(req.params.id)
    // .then((comments) =>{

        if(comments.user == req.user.id){
            let postId=  comments.post;
            comments.deleteOne();
            Post.findByIdAndUpdate(postId , { $pull :{comments : req.params.id}})
            await Like.deleteMany({likeAble : comments._id , onModel : 'Comment'})
        
            if(req.xhr){
                console.log("Inside xhr comments controller");
                return res.status(200).json({
                    data : {
                        comment_id : req.params.id
                    },
                    message : "Post deleted"
                })
            }
            console.log("Outside xhr");
            return res.redirect('back')
        }else{
            return res.redirect('back')
        }
    // })
}