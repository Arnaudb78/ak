"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CardFooter } from "./ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function SignUp() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if (!firstname || !lastname || !email || !password) {
          alert("Please fill in all fields");
          return;
      }
  
      const response = await fetch("/api/users/create", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstname, lastname, email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
          alert(data.message || "Something went wrong");
          return;
      }

      localStorage.setItem("user", JSON.stringify(data));

      router.push("/community");

      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
  };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Create User</CardTitle>
                <CardDescription>Create a new user in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="user-form" onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="firstname">Firstname</Label>
                            <Input id="firstname" placeholder="Firstname of your account" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="lastname">Lastname</Label>
                            <Input id="lastname" placeholder="Lastname of your account" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Email of your account" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
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
                <Button type="submit" form="user-form">
                    Create
                </Button>
            </CardFooter>
        </Card>
    );
}
