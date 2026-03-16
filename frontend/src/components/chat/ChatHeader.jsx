const ChatHeader = ({ activeChat }) => {
    if (!activeChat) return null;

    const { type, data } = activeChat;

    return (
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white shadow-sm z-10">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold uppercase">
                    {data.name.charAt(0)}
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900 leading-tight">
                        {data.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                        <span className={`w-2 h-2 rounded-full ${type === "private" ? "bg-green-500" : "bg-blue-500"}`}></span>
                        <span className="text-xs text-gray-500">
                            {type === "private" ? "Online" : "Group Chat"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;