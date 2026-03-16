import { useState, useEffect, useCallback } from "react";
import { getPrivateMessages, getGroupMessages } from "../api";
import { socket } from "../socket/socket.js";

export const useMessages = (activeChat) => {

    const [messages, setMessages] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const currentUserId = currentUser?._id;

    const getRoomId = useCallback((userId1, userId2) => {
        return [userId1, userId2].sort().join("_");
    }, []);

    const fetchMessages = useCallback(async () => {
        if (!activeChat) return;

        try {
            if (activeChat.type === "private") {
                const res = await getPrivateMessages(activeChat.data._id);
                setMessages(res.data.data);
            } else if (activeChat.type === "group") {
                const res = await getGroupMessages(activeChat.data._id);
                setMessages(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    }, [activeChat]);

    const sendMessage = useCallback((text) => {
        if (!activeChat || !text.trim() || !currentUserId) return;

        if (activeChat.type === "private") {
            const roomId = getRoomId(currentUserId, activeChat.data._id);
            socket.emit("send_private_message", {
                sender: currentUserId,
                receiver: activeChat.data._id,
                message: text,
                roomId: roomId
            });
        } else {
            socket.emit("send_group_message", {
                sender: currentUserId,
                groupId: activeChat.data._id,
                message: text
            });
        }
    }, [activeChat, currentUserId, getRoomId]);

    useEffect(() => {
        if (!activeChat || !currentUserId) return;

        setMessages([]); // Clear messages when switching chat
        fetchMessages();

        if (activeChat.type === "private") {
            const roomId = getRoomId(currentUserId, activeChat.data._id);
            socket.emit("join_private_room", roomId);
        } else {
            socket.emit("join_group", activeChat.data._id);
        }

        const handlePrivateMessage = (msg) => {
            setMessages(prev => [...prev, msg]);
        };

        const handleGroupMessage = (msg) => {
            setMessages(prev => [...prev, msg]);
        };

        socket.on("receive_private_message", handlePrivateMessage);
        socket.on("receive_group_message", handleGroupMessage);

        return () => {
            socket.off("receive_private_message", handlePrivateMessage);
            socket.off("receive_group_message", handleGroupMessage);
        };
    }, [activeChat, currentUserId, getRoomId, fetchMessages]);

    return {
        messages,
        sendMessage,
        fetchMessages
    };
};