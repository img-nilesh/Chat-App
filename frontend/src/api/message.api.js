import API from "./api";

export const getPrivateMessages = (userId) => {
    return API.get(`/messages/private/${userId}`);
};

export const getGroupMessages = (groupId) => {
    return API.get(`/messages/group/${groupId}`);
};