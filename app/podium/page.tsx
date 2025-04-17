'use client'

import AppBar from "@/components/app-bar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Podium() {
    const router = useRouter();
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            router.push("/");
        }   
    }, []);

    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <h1>Podium</h1>
            </div>
            <AppBar />
        </>

    )
}
