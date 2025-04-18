"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CardFooter } from "./ui/card";
import { useRouter } from "next/navigation";

export function FormAddPost() {
    const [pictureBefore, setPictureBefore] = useState<File | null>(null);
    const [pictureAfter, setPictureAfter] = useState<File | null>(null);
    const [selectedTab, setSelectedTab] = useState<'before' | 'after'>('before');
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (file: File | null) => void) => {
        if (e.target.files && e.target.files[0]) {
            setter(e.target.files[0]);
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
            alert("Please select both images");
            return;
        }

        if (!localStorage.getItem("user")) {
            alert("Please sign in to create a post");
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
                alert(data.message || "Something went wrong");
                return;
            }

            alert("Post created successfully");
            router.push("/community");
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to create post");
        }
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Create Post</CardTitle>
                <CardDescription>Create a new post in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="user-form" onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex items-center justify-between w-full p-1 rounded-3xl bg-[#F4F4F4]">
                            <p 
                                className={`cursor-pointer w-[48%] text-center py-3 rounded-2xl ${
                                    selectedTab === 'before' ? 'bg-black text-white font-bold' : ''
                                }`}
                                onClick={() => setSelectedTab('before')}
                            >
                                First Picture
                            </p>
                            <p 
                                className={`cursor-pointer w-[48%] text-center py-3 rounded-2xl ${
                                    selectedTab === 'after' ? 'bg-black text-white font-bold' : ''
                                }`}
                                onClick={() => setSelectedTab('after')}
                            >
                                Second Picture
                            </p>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            {selectedTab === 'before' ? (
                                <>
                                    <Label htmlFor="pictureBefore">First Picture</Label>
                                    <Input 
                                        id="pictureBefore" 
                                        type="file" 
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, setPictureBefore)} 
                                    />
                                    {pictureBefore && (
                                        <p className="text-sm text-green-600">First picture selected ✓</p>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Label htmlFor="pictureAfter">Second Picture</Label>
                                    <Input 
                                        id="pictureAfter" 
                                        type="file" 
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, setPictureAfter)} 
                                    />
                                    {pictureAfter && (
                                        <p className="text-sm text-green-600">Second picture selected ✓</p>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.push("/community")}>Cancel</Button>
                <Button type="submit" form="user-form">
                    Create
                </Button>
            </CardFooter>
        </Card>
    );
}