import { useUsers } from "../../hooks/useUsers";

const UsersList = ({ setActiveChat }) => {

    const { users, loading, error } = useUsers();

    if (loading && users.length === 0) {
        return (
            <div className="px-2 py-4 text-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600 mx-auto"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="px-2 py-4 text-center text-xs text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
                Direct Messages
            </h2>
            <div className="space-y-1">
                {users.length === 0 ? (
                    <p className="px-2 text-xs text-gray-400 italic">No other users found</p>
                ) : (
                    users.map(user => (
                        <div
                            key={user._id}
                            onClick={() => setActiveChat({ type: "private", data: user })}
                            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-indigo-50 cursor-pointer transition-colors group"
                        >
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-medium">
                                {user.name.charAt(0)}
                            </div>
                            <span className="text-gray-700 font-medium group-hover:text-indigo-700">
                                {user.name}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UsersList;