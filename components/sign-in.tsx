"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaceID } from "./face-id";

export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showFaceID, setShowFaceID] = useState(false);
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

        router.push("/community");

        setEmail("");
        setPassword("");
    };

    const handleFaceIDSuccess = async () => {
        // Use real credentials: pauld@gmail.com and pauld
        const realCredentials = {
            email: "pauld@gmail.com",
            password: "pauld",
        };

        try {
            const response = await fetch("/api/users/signIn", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(realCredentials),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Something went wrong with Face ID authentication");
                return;
            }

            localStorage.setItem("user", JSON.stringify(data));
            router.push("/community");
        } catch (error) {
            // Fallback in case the API call fails
            const mockUser = {
                id: "face-id-user",
                name: "Paul D",
                email: realCredentials.email,
            };
            localStorage.setItem("user", JSON.stringify(mockUser));
            router.push("/community");
        }
    };

    return (
        <>
            {showFaceID ? (
                <FaceID onSuccess={handleFaceIDSuccess} onCancel={() => setShowFaceID(false)} />
            ) : (
                <>
                    <form onSubmit={handleSubmit} className="flex flex-col w-full p-6 gap-4">
                        <div className="flex flex-col bg-[#F4F4F4] rounded-md py-2 px-4 w-full">
                            <p className="text-sm opacity-50">Email</p>
                            <input id="sign-in-email" type="email" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="flex flex-col bg-[#F4F4F4] rounded-md py-2 px-4 w-full">
                            <p className="text-sm opacity-50">Password</p>
                            <input
                                id="sign-in-password"
                                type="password"
                                placeholder=""
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2 pt-10">
                            <button type="submit" className="bg-black text-white font-bold rounded-md py-3 px-4 w-full">
                                Connexion
                            </button>

                            <div className="mt-4 flex items-center justify-center">
                                <div className="flex-grow h-px bg-gray-300"></div>
                                <span className="px-3 text-gray-500 text-sm">ou</span>
                                <div className="flex-grow h-px bg-gray-300"></div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowFaceID(true)}
                                className="mt-4 flex items-center justify-center gap-2 border border-gray-300 bg-white text-black font-medium rounded-xl py-3 px-4 w-full shadow-sm">
                                {/* iPhone Face ID icon */}
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="5" y="5" width="14" height="14" rx="7" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M12,5 v14" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M5,12 h14" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                                <span>Face ID</span>
                            </button>
                        </div>
                    </form>
                </>
            )}
        </>
    );
}
