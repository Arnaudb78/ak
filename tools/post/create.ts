import dbConnect from "@/database/connect";
import Post from "@/models/post";

export interface PostData {
    pictureBefore: string;
    pictureAfter: string;
    author: string;
    likes: number;
}

async function createPost(body: PostData) {
    if (!body) throw new Error("Body is required");

    await dbConnect();

    const post = await Post.create(body);

    return post;
}

export { createPost };
