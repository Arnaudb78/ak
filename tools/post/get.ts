import dbConnect from "@/database/connect";
import Post from "@/models/post";

async function getPosts() {
    await dbConnect();
    const posts = await Post.find();
    return posts;
}

export { getPosts };
