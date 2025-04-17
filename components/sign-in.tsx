"use client";

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

      router.push("/community");

      setEmail("");
      setPassword("");
  };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col w-full p-6 gap-4">
                <div className="flex flex-col bg-[#F4F4F4] rounded-md py-2 px-4 w-full">
                    <p className="text-sm opacity-50">Email</p>
                    <input id="sign-in-email" type="email" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex flex-col bg-[#F4F4F4] rounded-md py-2 px-4 w-full">
                    <p className="text-sm opacity-50">Password</p>
                    <input id="sign-in-password" type="password" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2 pt-10">
                    <button type="submit" className="bg-black text-white font-bold rounded-md py-3 px-4 w-full">Connexion</button>
                </div>
            </form>
        </>
    );
}
