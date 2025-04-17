import { NextResponse } from "next/server";
import { createPost } from "@/tools/post/create";
import User from "@/models/User";
import { saveImage } from "@/tools/save-pic";

export async function POST(req: Request) {
    const body = await req.json();
    const { pictureBefore, pictureAfter, author } = body;

    if (!pictureBefore || !pictureAfter || !author) {
        return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    try {
        console.log("Creating post...");

        const authorId = await User.findById(author);

        if (!authorId) {
            return NextResponse.json({ message: "Author not found" }, { status: 400 });
        }

        const pictureBeforePath = await saveImage(pictureBefore);
        const pictureAfterPath = await saveImage(pictureAfter);
        const likes = 0;

        const newPost = await createPost({ pictureBefore: pictureBeforePath, pictureAfter: pictureAfterPath, author: authorId, likes: likes });
        
        if (newPost.message) {
            return NextResponse.json({ message: newPost.message }, { status: 400 });
        }

        return NextResponse.json(newPost, { status: 201 });
        
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ message: "Error creating post" }, { status: 500 });
    }
}
