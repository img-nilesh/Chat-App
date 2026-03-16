import { useState } from "react";

const MessageInput = ({ sendMessage }) => {
    const [message, setMessage] = useState("");

    const handleSend = (e) => {
        e.preventDefault();
        if (message.trim()) {
            sendMessage(message);
            setMessage("");
        }
    };

    return (
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                <input
                    className="flex-1 bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-400"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    type="submit"
                    className="p-1 text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
                    disabled={!message.trim()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                </button>
            </div>
        </form>
    );
};

export default MessageInput;