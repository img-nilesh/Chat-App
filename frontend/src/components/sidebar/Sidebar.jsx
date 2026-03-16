import UsersList from "./UsersList";
import GroupsList from "./GroupsList";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ setActiveChat }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="w-80 border-r border-gray-200 bg-white flex flex-col h-full shadow-lg">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h1 className="text-xl font-bold text-indigo-600">ChatApp</h1>
                <button 
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    title="Logout"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                    <UsersList setActiveChat={setActiveChat} />
                    <div className="my-6 border-t border-gray-100"></div>
                    <GroupsList setActiveChat={setActiveChat} />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;