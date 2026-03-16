import API from "./api";

export const getUsers = () => {
    return API.get("/users");
};

export const getUserById = (id) => {
    return API.get(`/users/${id}`);
};