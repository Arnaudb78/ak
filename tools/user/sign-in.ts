import dbConnect from "@/database/connect";
import User from "@/models/User";

async function signIn(email: string, password: string) {
    if (!email || !password) return { message: "Veuillez remplir tous les champs." };
    await dbConnect();

    const user = await User.findOne({ email });

    if (!user) return { message: "Cette adresse email n'existe pas." };

    if (user.password !== password) return { message: "Mot de passe incorrect." };

    return user;
}

export { signIn };
