import { NextResponse } from "next/server";
import { getPosts } from "@/tools/post/get";
import User from "@/models/User";

export async function GET() {
    try {
        const posts = await getPosts();

        const authors = await User.find({ _id: { $in: posts.map((post) => post.author) } });
        
        const allPosts = {
            posts: posts.map(post => ({
                ...post.toObject(),
                pictureBefore: post.pictureBefore,
                pictureAfter: post.pictureAfter
            })),
            authors
        }
        return NextResponse.json(allPosts);
    } catch (error) {
        console.error("Error getting posts:", error);
        return NextResponse.json({ message: "Error getting posts" }, { status: 500 });
    }
}
