import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String
    },
    category:{
        type: String,
        required: true
    },

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'  
    }],
 
});

const Post = mongoose.model('BlogPost', blogPostSchema);

export default Post
