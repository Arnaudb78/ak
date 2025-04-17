"use client";

import AppBar from "@/components/app-bar";
import CardChallenge from "@/components/card-challenge";
import { CardPost } from "@/components/card-post";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PostData {
    _id: string;
    pictureBefore: string;
    pictureAfter: string;
    author: string;
    likes: number;
}

interface AuthorData {
    _id: string;
    firstname: string;
    lastname: string;
    picture: string;
    economy: number;
}

interface ApiResponse {
    posts: PostData[];
    authors: AuthorData[];
}

interface ChallengeData {
    _id: string;
    title: string;
    description: string;
    image: string;
    month: string;
}

export default function Community() {
    const [data, setData] = useState<ApiResponse>({ posts: [], authors: [] });
    const [challenges, setChallenges] = useState<ChallengeData>();
    const router = useRouter();

    useEffect(() => {
        const verifyUser = async () => {
            const user = localStorage.getItem("user");
            if (!user) {
                router.push("/");
            }
        }
        verifyUser();
        const fetchPosts = async () => {
            const response = await fetch("/api/post/get");
            const data = await response.json();
            setData(data);
        };
        fetchPosts();
        const fetchChallenges = async () => {
            const response = await fetch("/api/challenge/get");
            const data = await response.json();
            setChallenges(data[0]);
        };
        fetchChallenges();
    }, []);

    return (
        <>
            <div className="flex flex-col items-center justify-start h-full bg-[#F5F5F5] py-10">
                <h1 className="text-xl font-bold">Re_store</h1>
                <div className="flex flex-col items-center justify-start px-10 py-10 w-full">
                    <CardChallenge challenge={challenges || {
                        _id: '',
                        title: '',
                        description: '',
                        image: '',
                        month: ''
                    }} />
                </div>
                        
                <div className="flex flex-col items-center justify-start gap-4 px-10">
                    {data.posts.map((post) => {
                        const author = data.authors.find(a => a._id === post.author);
                        if (!author) return null;
                        return (
                            <CardPost 
                                key={post._id} 
                                post={post}
                                author={author} 
                            />
                        );
                    })}
                </div>
            </div>
            <AppBar />
        </>
    );
}
