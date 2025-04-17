import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    picture_before: String,
    picture_after: String,
    content: String,
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
