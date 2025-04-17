"use client";

import { FormAddPost } from "@/components/form-add-post";
import { CardPost } from "@/components/card-post";
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

export default function Community() {
    const [data, setData] = useState<ApiResponse>({ posts: [], authors: [] });

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("/api/post/get");
            const data = await response.json();
            setData(data);
        };
        fetchPosts();
    }, []);

    return (
        <div className="flex flex-col items-center justify-start h-screen gap-10">
            <h1>Community</h1>
            <FormAddPost />
            <div className="flex flex-col items-center justify-start gap-8 p-10">
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
    );
}
