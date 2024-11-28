import { FaRocketchat } from "react-icons/fa";
import GoogleButton from 'react-google-button'



const presetStyles = {
    messages: "bg-gray-500 rounded-full shadow-sm self-start p-2 mr-4",
}

export default function ChatRoom() {
    return (
        <>
            <div className="text-white">
                <div className="container mx-auto max-w-screen-lg mt-5 sm:mt-16 bg-[#242424] h-screen flex flex-col p-4">
                    <div className="flex flex-1 flex-col overflow-y-scroll gap-4">
                        <p className={presetStyles.messages}>Chatbot</p>
                        <p className={presetStyles.messages}>Chatbot</p>
                        <p className={`self-end ${presetStyles.messages}`}>Chatbot</p>
                        <p className={presetStyles.messages}>Chatbot</p>
                        <p className={presetStyles.messages}>Chatbot</p>
                        <p className={presetStyles.messages}>Chatbot</p>
                        <p className={presetStyles.messages}>Chatbot</p>
                        <p className={`self-end ${presetStyles.messages}`}>Chatbot</p>
                        <p className={presetStyles.messages}>Chatbot</p>
                        <p className={presetStyles.messages}>Chatbot</p>
                        <p className={presetStyles.messages}>Chatbot</p>
                        <p className={presetStyles.messages}>Chatbot</p>
                        <p className={`self-end ${presetStyles.messages}`}>Chatbot</p>
                        <p className={presetStyles.messages}>Chatbot</p>
                        <p className={presetStyles.messages}>Chatbot</p>
                        <p className={presetStyles.messages}>Chatbot</p>
                        <p className={presetStyles.messages}>Chatbot</p>
                        <p className={`self-end ${presetStyles.messages}`}>Chatbot</p>
                        <p className={presetStyles.messages}>Chatbot</p>
                        <p className={presetStyles.messages}>Chatbot</p>
                    </div>

                    <form className="w-[100%] flex justify-center mt-10 text-black">
                        <input type="text" name="message" placeholder="Message Chatbot" autoComplete="off" className="flex-1 p-2 outline-none" />
                        <button type="submit" className="text-sm md:text-lg bg-green-500 border-2 p-2 hover:bg-green-400">Send</button>
                    </form>
                </div>
            </div>
        </>
    )
}