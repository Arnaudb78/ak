"use client"

import { useState } from "react";
import AppBar from "@/components/app-bar";
import { useRouter } from "next/navigation";
import ShareDrawer from "@/components/share-drawer";
import { PencilRuler } from "lucide-react";
import { toast } from "sonner";

export default function Add() {
    const [pictureBefore, setPictureBefore] = useState<File | null>(null);
    const [pictureAfter, setPictureAfter] = useState<File | null>(null);
    const [selectedTab, setSelectedTab] = useState<'before' | 'after'>('before');
    const [previewBefore, setPreviewBefore] = useState<string | null>(null);
    const [previewAfter, setPreviewAfter] = useState<string | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (file: File | null) => void, setPreview: (preview: string | null) => void) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setter(file);
            
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
            
            // Switch to the other tab after selecting a picture
            setSelectedTab(selectedTab === 'before' ? 'after' : 'before');
        }
    };

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

        if (!pictureBefore || !pictureAfter) {
            toast.error("Veuillez sélectionner les deux images");
            return;
        }

        if (!localStorage.getItem("user")) {
            toast.error("Veuillez vous connecter pour créer un post");
            router.push("/");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user") || "{}");

        try {
            const pictureBeforeBase64 = await convertToBase64(pictureBefore);
            const pictureAfterBase64 = await convertToBase64(pictureAfter);

            const response = await fetch("/api/post/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    pictureBefore: pictureBeforeBase64, 
                    pictureAfter: pictureAfterBase64, 
                    author: user._id 
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                toast.error(data.message || "Une erreur est survenue");
                return;
            }

            toast.success("Félicitations ! Votre post à bien été créé 🎉 !");
            router.push("/community");
        } catch (error) {
            console.error("Error creating post:", error);
            toast.error("Échec de la création du post");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <AppBar />
            <div className="flex-1 flex flex-col p-4">
                <div className="w-full max-w-4xl mx-auto">
                    <button 
                        onClick={() => router.push("/community")}
                        className="mb-4 p-2 rounded-full hover:bg-gray-100"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <path d="M15 18l-6-6 6-6"/>
                        </svg>
                    </button>
                    
                    <form id="user-form" onSubmit={handleSubmit} className="w-full">
                        <div className="flex items-center justify-between w-full p-1 rounded-3xl bg-[#F4F4F4] mb-6">
                            <button 
                                type="button"
                                className={`w-[48%] text-center py-3 rounded-2xl ${
                                    selectedTab === 'before' ? 'bg-black text-white font-bold' : ''
                                }`}
                                onClick={() => setSelectedTab('before')}
                            >
                                Avant
                            </button>
                            <button 
                                type="button"
                                className={`w-[48%] text-center py-3 rounded-2xl ${
                                    selectedTab === 'after' ? 'bg-black text-white font-bold' : ''
                                }`}
                                onClick={() => setSelectedTab('after')}
                            >
                                Après
                            </button>
                        </div>

                        <div className="mb-6 px-4">
                            {selectedTab === 'before' ? (
                                <div className="relative aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, setPictureBefore, setPreviewBefore)}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    {previewBefore ? (
                                        <img 
                                            src={previewBefore} 
                                            alt="First picture preview" 
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    width="24" 
                                                    height="24" 
                                                    viewBox="0 0 24 24" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    strokeWidth="2" 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round"
                                                    className="text-white"
                                                >
                                                    <path d="M12 5v14M5 12h14"/>
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="relative aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, setPictureAfter, setPreviewAfter)}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    {previewAfter ? (
                                        <img 
                                            src={previewAfter} 
                                            alt="Second picture preview" 
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    width="24" 
                                                    height="24" 
                                                    viewBox="0 0 24 24" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    strokeWidth="2" 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round"
                                                    className="text-white"
                                                >
                                                    <path d="M12 5v14M5 12h14"/>
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-4 px-4">
                            <div className="flex items-center gap-2">
                                <PencilRuler />
                                <p className="font-bold">Matière</p>
                            </div>
                            <div className="flex flex-wrap gap-2 pl-8">
                                <button 
                                    type="button"
                                    onClick={() => setSelectedMaterial('jean')}
                                    className={`px-3 py-1 rounded-lg ${selectedMaterial === 'jean' ? 'bg-black text-white' : 'bg-[#F4F4F4] hover:bg-gray-200'}`}
                                >
                                    Jean
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setSelectedMaterial('coton')}
                                    className={`px-3 py-1 rounded-lg ${selectedMaterial === 'coton' ? 'bg-black text-white' : 'bg-[#F4F4F4] hover:bg-gray-200'}`}
                                >
                                    Coton
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setSelectedMaterial('cuir')}
                                    className={`px-3 py-1 rounded-lg ${selectedMaterial === 'cuir' ? 'bg-black text-white' : 'bg-[#F4F4F4] hover:bg-gray-200'}`}
                                >
                                    Cuir
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setSelectedMaterial('laine')}
                                    className={`px-3 py-1 rounded-lg ${selectedMaterial === 'laine' ? 'bg-black text-white' : 'bg-[#F4F4F4] hover:bg-gray-200'}`}
                                >
                                    Laine
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 px-4 pt-4">
                            <div className="flex items-center gap-2">
                                <PencilRuler />
                                <p className="font-bold">Lieu</p>
                            </div>
                            <div className="flex flex-wrap gap-2 pl-8">
                                <button 
                                    type="button"
                                    onClick={() => setSelectedMaterial('paris')}
                                    className={`px-3 py-1 rounded-lg ${selectedMaterial === 'paris' ? 'bg-black text-white' : 'bg-[#F4F4F4] hover:bg-gray-200'}`}
                                >
                                    Paris
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setSelectedMaterial('toulouse')}
                                    className={`px-3 py-1 rounded-lg ${selectedMaterial === 'toulouse' ? 'bg-black text-white' : 'bg-[#F4F4F4] hover:bg-gray-200'}`}
                                >
                                    Toulouse
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setSelectedMaterial('meudon')}
                                    className={`px-3 py-1 rounded-lg ${selectedMaterial === 'meudon' ? 'bg-black text-white' : 'bg-[#F4F4F4] hover:bg-gray-200'}`}
                                >
                                    Meudon
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setSelectedMaterial('versailles')}
                                    className={`px-3 py-1 rounded-lg ${selectedMaterial === 'versailles' ? 'bg-black text-white' : 'bg-[#F4F4F4] hover:bg-gray-200'}`}
                                >
                                    Versailles
                                </button>
                            </div>
                        </div>

                        {pictureBefore && pictureAfter && (
                            <div className="flex justify-center px-4 gap-2 pt-10">
                                <button className="w-full py-3 text-base font-medium bg-[#F4F4F4] rounded-2xl hover:bg-gray-800">
                                    Brouillon
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setIsDrawerOpen(true)}
                                    className="w-full py-3 text-base font-medium text-white bg-black rounded-2xl hover:bg-gray-800"
                                >
                                    Partager
                                </button>
                            </div>
                        )}
                    </form>

                    <div className="flex justify-center w-full">
                      
                    </div>

                    <ShareDrawer 
                        isOpen={isDrawerOpen}
                        onSubmit={handleSubmit}
                        pictureBefore={previewBefore}
                        pictureAfter={previewAfter}
                    />
                </div>
            </div>
        </div>
    )
}
