import { useState, useEffect, useCallback } from "react";
import { getGroups, createGroup, joinGroup } from "../api";
import { socket } from "../socket/socket.js";

export const useGroups = () => {

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchGroups = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getGroups();
            setGroups(res.data.data || []);
            setError(null);
        } catch (err) {
            console.error("Error fetching groups:", err);
            setError(err.message || "Failed to fetch groups");
        } finally {
            setLoading(false);
        }
    }, []);

    const createNewGroup = async (data) => {
        try {
            const res = await createGroup(data);
            socket.emit("new_group", res.data.data);
            fetchGroups();
        } catch (err) {
            console.error("Error creating group:", err);
            throw err;
        }
    };

    const joinExistingGroup = async (id) => {
        try {
            await joinGroup(id);
            fetchGroups();
        } catch (err) {
            console.error("Error joining group:", err);
            throw err;
        }
    };

    useEffect(() => {
        fetchGroups();

        const handleGroupCreated = () => {
            fetchGroups();
        };

        socket.on("group_created", handleGroupCreated);

        return () => {
            socket.off("group_created", handleGroupCreated);
        };
    }, [fetchGroups]);

    return {
        groups,
        createNewGroup,
        joinExistingGroup,
        loading,
        error
    };
};