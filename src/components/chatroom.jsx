import React from "react";
import { useState, useEffect } from "react"
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../backend/firebase.js";



const presetStyles = {
    messages: "bg-gray-500 rounded-full shadow-sm self-start p-2 mr-4",
}


export default function ChatRoom() {
    const [formData, setFormData] = useState(null);
    const [messagesList, setMessagesList] = useState([]);
    const [id, setId] = useState(0);

    async function onClickSend(e) {
        e.preventDefault();

        if (formData !== null) {
            try {
                const docRef = await addDoc(collection(db, "messages"), {
                id: id,
                text: formData,
                type: "human",
                created: serverTimestamp(),
            });
            console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
            setId(id => id + 1);
            setFormData(null);
        }
    }
    

    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("created"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const msgs = [];
            querySnapshot.forEach((doc) => {
                msgs.push(
                    <p key={doc.data().id} className={presetStyles.messages}>{doc.data().text}</p>
                );
            });
            setMessagesList(msgs);
        });

        return () => unsubscribe();
    }, []);

    return (
        <>
            <div className="text-white">
                <div className="container mx-auto max-w-screen-lg mt-5 sm:mt-16 bg-[#242424] h-screen flex flex-col p-4">
                    <div className="flex flex-1 flex-col overflow-y-scroll gap-4">
                        {messagesList}
                    </div>

                    <form onClick={(e) => {onClickSend(e)}} className="w-[100%] flex justify-center mt-10 text-black">
                        <input onChange={e => {setFormData(e.target.value)}} type="text" name="message" placeholder="Message Chatbot" autoComplete="off" className="flex-1 p-2 outline-none" />
                        <button type="submit" className="text-sm md:text-lg bg-green-500 border-2 p-2 hover:bg-green-400">Send</button>
                    </form>
                </div>
            </div>
        </>
    )
}