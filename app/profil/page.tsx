"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppBar from "@/components/app-bar";
import { Settings, ArrowRight } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

interface User {
    email: string;
    firstname: string;
    lastname: string;
    picture: string;
    followers: number;
    following: number;
    posts: number;
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

    const handleAccount = () => {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center">
                    <Settings className="w-6 h-6 opacity-20" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profil</DropdownMenuItem>
                    <DropdownMenuItem>Paramètres</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>Déconnexion</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/");
    }

    

    return (
        <>
           <div className="flex items-start justify-center h-full pt-20 px-10">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                    <img src={user?.picture} alt="Profil" className="w-16 h-16 rounded-full" />
                    <div>
                        <h1>{user?.firstname} {user?.lastname}</h1>
                        <p className="text-sm opacity-50">{user?.email}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {handleAccount()}
                </div>
            </div>
           </div>
           <div className="flex items-center justify-start px-14 py-6 gap-10">
                <div className="flex flex-col gap-2">
                    <p>Suit</p>
                    <p className="font-bold">{user?.following}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <p>Suivi(e)s</p>
                    <p className="font-bold">{user?.followers}</p>
                </div>
            </div>
            <div className="flex items-center justify-start px-10 py-6 gap-4">
                <div className="bg-[#D2EDFF] rounded-2xl p-4 w-full">
                    <p>Podium</p>
                    <p className="font-bold">{user?.posts} fois</p>
                </div>
                <div className="bg-[#FF6135] rounded-2xl p-4 w-full">
                    <p>Post</p>
                    <p className="font-bold">{user?.posts}</p>
                </div>
            </div>
            <div className="flex items-center justify-start px-10 gap-4">
                <div className="bg-[#D2EDFF] rounded-2xl p-4 w-full">
                    <p>Carbone</p>
                    <p className="font-bold">{user?.posts} fois</p>
                </div>
            </div>
            <div className="flex items-center justify-start px-10 py-6 gap-4">
                <div className="bg-[#FF6135] rounded-2xl p-4 w-full">
                    <div className="flex flex-col">
                        <p className="font-bold">Historique</p>
                        <p className="text-xs">3 derniers mois</p>
                    </div>
                    <div className="flex items-center justify-end -mt-8">
                            <ArrowRight className="w-8 h-8" />
                        </div>
                </div>
            </div>
        <AppBar />
        </>
    )
}