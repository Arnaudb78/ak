import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    picture: String,
    economy: {
        type: Number,
        default: 10
    },
    followers: {
        type: Number,
        default: 0
    },
    following: {
        type: Number,
        default: 0
    },
    posts: {
        type: Number,
        default: 0
    },
    
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;