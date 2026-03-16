import { useState, useEffect, useCallback } from "react";
import { getUsers } from "../api";

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getUsers();
            setUsers(res.data.data || []);
            setError(null);
        } catch (err) {
            console.error("Error fetching users:", err);
            setError(err.message || "Failed to fetch users");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return { users, fetchUsers, loading, error };
};