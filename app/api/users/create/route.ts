import { NextResponse } from "next/server";
import { createUser } from "@/tools/user/create";
import User from "@/models/User";
import { saveImage } from "@/tools/save-pic";

export async function POST(req: Request) {
    const body = await req.json();
    const { firstname, lastname, email, password, picture } = body;

    if (!firstname || !lastname || !email || !password) {
        return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    try {
        console.log("Creating user...");

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }
        let pictureUrl = null;
        if (picture) {
            pictureUrl = await saveImage(picture);
        }
        const followers = 0;
        const following = 0;
        const posts = 0;

        const newUser = await createUser({ firstname, lastname, email, password, picture: pictureUrl || undefined, followers, following, posts });

        if (newUser.message) {
            return NextResponse.json({ message: newUser.message }, { status: 400 });
        }

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Error creating user" }, { status: 500 });
    }
}
