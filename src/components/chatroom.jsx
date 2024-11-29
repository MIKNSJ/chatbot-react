import React from "react";
import { useState, useEffect } from "react"
import { getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../backend/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { model } from "../backend/gemini.js";



const styles = {
    userMessages: "flex flex-col gap-1 bg-blue-500 self-end rounded shadow-sm p-2 mr-4",
    robotMessages: "flex flex-col gap-1 bg-gray-500 self-start rounded shadow-sm p-2 mr-4"
}


export default function ChatRoom() {
    const [formData, setFormData] = useState("");
    const [messages, setMessages] = useState([]);
    const [displayMessages, setDisplayMessages] = useState([]);
    const [textId, setTextId] = useState(0);
    const [user] = useAuthState(auth);

    async function onClickSend(e) {
        e.preventDefault();

        if (user && formData !== null) {
            //const docRef = doc(db, "users", user.uid);
            //const docRefGrab = await getDoc(docRef);
            //const docData = docRefGrab.data();

            const aiResponse = await model.generateContent(formData);
            const aiResponseText = aiResponse.response.text();

            const newMessages = [...messages];
            newMessages.push({
                textId: textId,
                text: formData,
                type: "human",
            })
            setTextId(textId => textId + 1);

            newMessages.push({
                textId: textId,
                text: aiResponseText,
                type: "robot",
            })
            setMessages(newMessages);

            await setDoc(doc(db, "users", user.uid), {
                messages: newMessages,
                lastModified: serverTimestamp(),
            }, {merge: true});
            //console.log("Document written");
            setTextId(textId => textId + 1);
            setFormData("");
        }
    }


    async function getMessages() {
        const docRef = doc(db, "users", user.uid);
        const docRefGrab = await getDoc(docRef);
        const docData = docRefGrab.data();

        const msgs = [];
        if (docData.messages) {
            for (let i = 0; i < docData.messages.length; i++) {
                msgs.push(
                    <div className={`${docData.messages[i]["type"] === "human" ? styles.userMessages : styles.robotMessages}`}>
                        <p key={i} className={`text-sm ${docData.messages[i]["type"] === "human" ? "self-end" : "self-start"}`}>{docData.messages[i]["type"] === "human" ? "You" : "Gemini"}</p>
                        <p key={i}>{docData.messages[i]["text"]}</p>
                    </div>
                );
            }
            setDisplayMessages(msgs);
        }
    }


    useEffect(() => {
        if (user) {
            getMessages();
        }
    });


    return (
        <>
            <div className="text-white">
                <div className="container mx-auto max-w-screen-lg mt-5 sm:mt-16 bg-[#242424] h-screen flex flex-col p-4">
                    <div className="flex flex-1 flex-col overflow-y-scroll gap-36">
                        {user ? displayMessages : null}
                    </div>

                    <form onSubmit={e => {onClickSend(e)}} className="w-[100%] flex justify-center mt-10 text-black">
                        <input onChange={e => {setFormData(e.target.value)}} type="text" name="message" value={formData} placeholder="Message Chatbot" autoComplete="off" className="flex-1 p-2 outline-none" />
                        <button type="submit" className="text-sm md:text-lg bg-green-500 border-2 p-2 hover:bg-green-400">Send</button>
                    </form>
                </div>
            </div>
        </>
    )
}