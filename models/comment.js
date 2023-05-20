const mongoose= require('mongoose');


const commentsSchema     = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    //comment belongs to user
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'post'
    },
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Like'
        }
    ]
},{
    timestamps : true
})

const Comment = mongoose.model('Comment' , commentsSchema);
module.exports = Comment;