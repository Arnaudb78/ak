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
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (file: File | null) => void) => {
        if (e.target.files && e.target.files[0]) {
            setter(e.target.files[0]);
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
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="pictureBefore">Picture Before</Label>
                            <Input 
                                id="pictureBefore" 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, setPictureBefore)} 
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="pictureAfter">Picture After</Label>
                            <Input 
                                id="pictureAfter" 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, setPictureAfter)} 
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