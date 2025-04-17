"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignUp() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [picture, setPicture] = useState<File | null>(null);
    const router = useRouter();

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if (!firstname || !lastname || !email || !password) {
          alert("Please fill in all fields");
          return;
      }

      let pictureBase64 = null;
      if (picture) {
          pictureBase64 = await convertToBase64(picture);
      }
  
      const response = await fetch("/api/users/create", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstname, lastname, email, password, picture: pictureBase64 }),
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
        <form onSubmit={handleSubmit} className="flex flex-col w-full p-6 gap-4">
            <div className="flex flex-col bg-[#F4F4F4] rounded-md py-2 px-4 w-full">
                <p className="text-sm opacity-50">Firstname</p>
                <input id="firstname" placeholder="" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
            </div>
            <div className="flex flex-col bg-[#F4F4F4] rounded-md py-2 px-4 w-full">
                <p className="text-sm opacity-50">Lastname</p>
                <input id="lastname" placeholder="" value={lastname} onChange={(e) => setLastname(e.target.value)} />
            </div>
            <div className="flex flex-col bg-[#F4F4F4] rounded-md py-2 px-4 w-full">
                <p className="text-sm opacity-50">Email</p>
                <input id="email" type="email" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="flex flex-col bg-[#F4F4F4] rounded-md py-2 px-4 w-full">
                <p className="text-sm opacity-50">Password</p>
                <input id="password" type="password" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="flex flex-col bg-[#F4F4F4] rounded-md py-2 px-4 w-full">
                <p className="text-sm opacity-50">Profile Picture</p>
                <input id="picture" type="file" onChange={(e) => setPicture(e.target.files?.[0] || null)} />
            </div>
            <div className="flex flex-col gap-2 pt-10">
                <button type="submit" className="bg-black text-white font-bold rounded-md py-3 px-4 w-full">Create Account</button>
            </div>
        </form>
    );
}
