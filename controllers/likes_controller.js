const Like = require("../models/likes");
const Comment = require('../models/comment');
const Post  =  require("../models/posts");


module.exports.toggleLike = async function(req , res){
    try {
        let likeAble;
        let deleted =  false;

        //like/toggle/?id=abcde&type=Post
        if(req.query.type === 'Post'){
            likeAble =  await Post.findById(req.query.id).populate('likes');
        }else{
            likeAble = await Comment.findById(req.query.id).populate('likes');
        }

        let existingLike = await Like.findOne({
            likeable : req.query.id,
            onModel : req.query.type,
            user : req.user._id
        })

        if(existingLike){
            likeAble.likes.pull(existingLike._id);
            likeAble.save();
            existingLike.deleteOne();
            deleted = true;
        }else{
            let newLike =  await Like.create({
                user : req.user._id,
                likeable : req.query.id,
                onModel : req.query.type

            })

            likeAble.likes.push(newLike._id);
            likeAble.save();
        }
        return res.json(200 , {
            message : 'Request successfull !',
            data : {
                deleted : deleted
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.json(500,{
            message : 'Internal Server Error'
        })
    }
}