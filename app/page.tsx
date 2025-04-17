"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SignUp } from "@/components/sign-up";
import { SignIn } from "@/components/sign-in";

export default function Home() {
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      {isSignIn ? <SignUp /> : <SignIn />}
      <Button onClick={() => setIsSignIn(!isSignIn)}>{isSignIn ? "Sign In" : "New User"}</Button>
    </div>
    </>
  );
}
