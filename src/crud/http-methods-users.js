import http from "../http-common";

export const updateUser = (id, data) => {
    return http.put(`/users/${id}`, data);
};
export const getAllUsers = () => {
    return http.get("/users");
};

export const getUser = (username) => {
    return http.get(`/users/?q=${username}&_embed=borrowState`);
};

export const createUser = (data) => {
    return http.post("/users", data);
};
