import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    pictureBefore: String,
    pictureAfter: String,
    likes: Number,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
