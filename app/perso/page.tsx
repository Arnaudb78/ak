"use client";

import { FormAddPost } from "@/components/form-add-post";
import { FormChallenge } from "@/components/form-challenge";
export default function Perso() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <FormAddPost />
            <FormChallenge />
        </div>
    )
}
