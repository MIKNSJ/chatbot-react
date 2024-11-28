import React from "react";
import { useState, useEffect } from "react"
import { FaRocketchat } from "react-icons/fa";
import GoogleButton from 'react-google-button';
import { signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth, provider } from "../backend/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";



export default function Navbar() {
    const [user, loading, error] = useAuthState(auth);

    return (
        <>
            <div className="bg-zinc-800 text-white">
                <div className="container mx-auto max-w-screen-xl flex justify-between items-center shadow-md p-4">
                    <div className="flex gap-4 items-center">
                        <FaRocketchat size={50}/>
                        <h1 className="text-white font-bold sm:text-4xl">Chatbot</h1>
                    </div>
                    {user ? <h1 className="text-red-500">Sign Out</h1> : <GoogleButton onClick={() => {signInWithRedirect(auth, provider)}}/>}
                </div>
            </div>
        </>
    )
}