"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CardFooter } from "./ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Select, SelectLabel, SelectItem, SelectGroup, SelectContent, SelectTrigger, SelectValue } from "./ui/select";

export function FormChallenge() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [month, setMonth] = useState("");
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

      if (!title || !description || !image || !month) {
          alert("Please fill in all fields");
          return;
      }

      try {
          const imageBase64 = await convertToBase64(image);
  
          const response = await fetch("/api/challenge/create", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ title, description, image: imageBase64, month }),
          });
  
          const data = await response.json();
  
          if (!response.ok) {
              alert(data.message || "Something went wrong");
              return;
          }

          localStorage.setItem("user", JSON.stringify(data));

          router.push("/community");

          setTitle("");
          setDescription("");
          setImage(null);
          setMonth("");
      } catch (error) {
          console.error("Error creating challenge:", error);
          alert("Failed to create challenge");
      }
  };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Create a challenge</CardTitle>
                <CardDescription>Create a challenge to share with the community.</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="challenge-form" onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="challenge-title">Title</Label>
                            <Input id="challenge-title" type="text" placeholder="Title of the challenge" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="challenge-description">Description</Label>
                            <Input
                                id="challenge-description"
                                placeholder="Description of the challenge"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="challenge-image">Image</Label>
                            <Input 
                                id="challenge-image" 
                                type="file" 
                                placeholder="Image of the challenge" 
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setImage(e.target.files[0]);
                                    }
                                }} 
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="challenge-month">Month</Label>
                            <Select onValueChange={(value) => setMonth(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a month" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Months</SelectLabel>
                                        <SelectItem value="janvier">January</SelectItem>
                                        <SelectItem value="février">February</SelectItem>
                                        <SelectItem value="mars">March</SelectItem>
                                        <SelectItem value="avril">April</SelectItem>
                                        <SelectItem value="mai">May</SelectItem>
                                        <SelectItem value="juin">June</SelectItem>
                                        <SelectItem value="juillet">July</SelectItem>
                                        <SelectItem value="août">August</SelectItem>
                                        <SelectItem value="septembre">September</SelectItem>
                                        <SelectItem value="octobre">October</SelectItem>
                                        <SelectItem value="novembre">November</SelectItem>
                                        <SelectItem value="décembre">December</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button type="submit" form="challenge-form">
                    Create
                </Button>
            </CardFooter>
        </Card>
    );
}
