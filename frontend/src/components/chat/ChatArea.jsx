import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useMessages } from "../../hooks/useMessages";

const ChatArea = ({ activeChat }) => {
    const { messages, sendMessage } = useMessages(activeChat);

    if (!activeChat) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-gray-400">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3.091-3.091c-.33-.33-.66-.66-1.01-.661l-2.031.001A8.25 8.25 0 014.5 9c0-4.556 3.694-8.25 8.25-8.25 4.556 0 8.25 3.694 8.25 8.25v.761z" />
                    </svg>
                </div>
                <p className="text-lg font-medium">Select a conversation to start chatting</p>
                <p className="text-sm">Choose from your direct messages or groups on the left.</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
            <ChatHeader activeChat={activeChat} />
            <MessageList messages={messages} activeChat={activeChat} />
            <MessageInput sendMessage={sendMessage} />
        </div>
    );
};

export default ChatArea;