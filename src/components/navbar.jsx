import React from "react";
import { FaRocketchat } from "react-icons/fa";
import GoogleButton from 'react-google-button';
import { auth, signInWithGoogle } from "../backend/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";



export default function Navbar() {
    const [user] = useAuthState(auth);

    return (
        <>
            <div className="bg-zinc-800 text-white">
                <div className="container mx-auto max-w-screen-xl flex justify-between items-center shadow-md p-4">
                    <div className="flex gap-4 items-center">
                        <FaRocketchat size={50}/>
                        <h1 className="text-white font-bold sm:text-4xl">Chatbot</h1>
                    </div>
                    {user ? <button onClick={() => {auth.signOut()}} className="bg-white text-black p-4 hover:bg-slate-300">Sign Out</button> : <GoogleButton onClick={signInWithGoogle}/>}
                </div>
            </div>
        </>
    )
}