import { useMessages } from "../../hooks/useMessages";

const MessageList = ({ messages, activeChat }) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 flex flex-col">
            {messages.length === 0 ? (
                <div className="text-center text-gray-400 mt-10">No messages yet</div>
            ) : (
                messages.map((msg) => {
                    const isMe = msg.sender === currentUser?._id;
                    return (
                        <div
                            key={msg._id}
                            className={`max-w-[70%] p-3 rounded-2xl shadow-sm ${
                                isMe 
                                    ? "bg-indigo-600 text-white self-end rounded-br-none" 
                                    : "bg-white text-gray-800 self-start rounded-bl-none"
                            }`}
                        >
                            {activeChat.type === "group" && !isMe && (
                                <p className="text-[10px] font-bold text-indigo-400 mb-1">
                                    {msg.senderName || "Unknown"}
                                </p>
                            )}
                            <p className="text-sm">{msg.message}</p>
                            <span className={`text-[10px] opacity-70 block mt-1 text-right ${isMe ? 'text-indigo-100' : 'text-gray-400'}`}>
                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default MessageList;