import API from "./api";

export const createGroup = (data) => {
    return API.post("/groups", data);
};

export const getGroups = () => {
    return API.get("/groups");
};

export const getGroupById = (id) => {
    return API.get(`/groups/${id}`);
};

export const joinGroup = (id) => {
    return API.post(`/groups/${id}/join`);
};