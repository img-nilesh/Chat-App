import Sidebar from "../components/sidebar/Sidebar";
import ChatArea from "../components/chat/ChatArea";
import { useState } from "react";

const ChatPage = () => {

    const [activeChat, setActiveChat] = useState(null);

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            <Sidebar setActiveChat={setActiveChat} />
            <ChatArea activeChat={activeChat} />
        </div>
    );
};

export default ChatPage;