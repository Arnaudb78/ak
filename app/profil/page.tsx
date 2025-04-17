"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface User {
    email: string;
    name: string;
    password: string;
}

export default function Profil() { 
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUserFromLocalStorage = localStorage.getItem("user");

        if (!getUserFromLocalStorage) {
            router.push("/");
        }

        const user = JSON.parse(getUserFromLocalStorage || "{}");

        setUser(user);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/");
    }

    

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Profil</CardTitle>
                    <CardDescription>Your profil informations.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{user?.email}</p>
                    <p>{user?.name}</p>
                    <p>{user?.password}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleLogout}>Logout</Button>
                </CardFooter>
            </Card>
        </div>
    )
}