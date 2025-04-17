'use client'

import AppBar from "@/components/app-bar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CardCategorie from "@/components/card-categorie";
import { Search } from "lucide-react";

export default function Act() {
    const router = useRouter();
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            router.push("/");
        }   
    }, []);
    
    return (
        <div className="flex flex-col items-center justify-center h-screen w-full pt-20 px-4 gap-10">
            <div className="w-full px-8">
                <div className="flex items-center justify-center w-full px-4 rounded-2xl bg-[#F4F4F4]">
                    <Search className="w-6 h-6" />
                    <input type="text" placeholder="Rechercher" className="w-full rounded-2xl p-2" />
                </div>
            </div>
           
            <div className="flex items-center justify-center w-full px-4">
                <CardCategorie />
            </div>
            <AppBar />
        </div>
    )
}