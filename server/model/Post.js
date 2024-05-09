import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    src: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    creator: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timeToRead: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    feedSrc: {
        type: String,
        required: true
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post;