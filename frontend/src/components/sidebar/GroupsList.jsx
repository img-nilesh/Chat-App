import { useState } from "react";
import { useGroups } from "../../hooks/useGroups";

const GroupsList = ({ setActiveChat }) => {
    const { groups, createNewGroup, loading, error } = useGroups();
    const [isCreating, setIsCreating] = useState(false);
    const [newGroupName, setNewGroupName] = useState("");

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        if (newGroupName.trim()) {
            await createNewGroup({ name: newGroupName });
            setNewGroupName("");
            setIsCreating(false);
        }
    };

    return (
        <div className="mt-8">
            <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Channels
                </h2>
                <button 
                    onClick={() => setIsCreating(!isCreating)}
                    className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-indigo-600 transition-colors"
                    title="Create Group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>

            {isCreating && (
                <form onSubmit={handleCreateGroup} className="px-2 mb-4 animate-in fade-in slide-in-from-top-1">
                    <input
                        type="text"
                        placeholder="Group name..."
                        className="w-full px-3 py-2 text-sm border border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50/30"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        autoFocus
                    />
                    <div className="flex justify-end space-x-2 mt-2">
                        <button 
                            type="button"
                            onClick={() => setIsCreating(false)}
                            className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
                        >
                            Create
                        </button>
                    </div>
                </form>
            )}

            {loading && groups.length === 0 ? (
                <div className="px-2 py-4 text-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600 mx-auto"></div>
                </div>
            ) : error ? (
                <div className="px-2 py-4 text-center text-xs text-red-500">
                    {error}
                </div>
            ) : (
                <div className="space-y-1">
                    {groups.length === 0 ? (
                        <p className="px-2 text-xs text-gray-400 italic">No channels joined</p>
                    ) : (
                        groups.map(group => (
                            <div
                                key={group._id}
                                onClick={() => setActiveChat({ type: "group", data: group })}
                                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold">
                                    #
                                </div>
                                <span className="text-gray-700 font-medium group-hover:text-blue-700">
                                    {group.name}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default GroupsList;