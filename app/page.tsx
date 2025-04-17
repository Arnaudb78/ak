"use client";

import { useState } from "react";
import { SignUp } from "@/components/sign-up";
import { SignIn } from "@/components/sign-in";

export default function Home() {
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-2">
        <h2 className="text-xl font-bold">Re_fashion</h2>
        <p>Présente</p>
        <h1 className="text-4xl font-bold">Re_store</h1>
       {isSignIn ? <SignUp /> : <SignIn />}
       <div className="flex flex-col gap-2 pt-10 items-center">
            <p className="text-sm underline">Mot de passe oublié ?</p>
        </div>

        {isSignIn ? (
          <div className="flex flex-col pt-10 items-center">
            <p className="text-sm">Déjà un compte ?</p>
            <button className="text-sm font-bold underline" onClick={() => setIsSignIn(false)}>Connectez-vous !</button>            
          </div>
        ) : (
          <div className="flex flex-col pt-10 items-center">
            <p className="text-sm">Vous n&apos;avez pas de compte ?</p>
            <button className="text-sm font-bold underline" onClick={() => setIsSignIn(true)}>Créer un compte !</button>            
          </div>
        )}
      </div>
    </>
  );
}
