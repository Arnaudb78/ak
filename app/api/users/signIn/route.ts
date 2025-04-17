import { signIn } from "@/tools/user/sign-in";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const body = await req.json();
    const { email, password } = body;

    const user = await signIn(email, password);

    if (user.message) {
        return NextResponse.json({ message: user.message }, { status: 400 });
    }

    return NextResponse.json(user, { status: 200 });
}