"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CardFooter } from "./ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!email || !password) {
          alert("Please fill in all fields");
          return;
      }
  
      const response = await fetch("/api/users/signIn", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
          alert(data.message || "Something went wrong");
          return;
      }

      localStorage.setItem("user", JSON.stringify(data));

      router.push("/profil");

      setEmail("");
      setPassword("");
  };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Sign in to your account.</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="sign-in-form" onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="sign-in-email">Email</Label>
                            <Input id="sign-in-email" type="email" placeholder="Email of your account" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="sign-in-password">Password</Label>
                            <Input
                                id="sign-in-password"
                                placeholder="Password of your account"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button type="submit" form="sign-in-form">
                    Sign In
                </Button>
            </CardFooter>
        </Card>
    );
}
