"use client";
import CustomButton from "@/components/custom-button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateGame() {
    const router = useRouter(); 
    const [code, setCode] = useState("");

    // Function to hancle text change

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.push(`/${code}`);
        }
        console.log(e.key);
    };
    

    return (
        <div>
            <h1>Create Game</h1>
            <input onChange={handleTextChange} onKeyDown={handleKeyPress} type="text" placeholder="Enter game code" className="p-1 my-2 rounded-lg text-black" />
            <br />
            <CustomButton buttonText='Create Game' callback={() => true} className='w-3/4 rounded-xl py-3' />
            <button onClick={() => router.push(`/${code}`)} className="bg-slate-100 text-black p-2 my-2 rounded-lg">Create Game</button>
        </div>
    );
}
