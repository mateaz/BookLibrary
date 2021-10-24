import http from "../http-common";

export const updateUser = (id, data) => {
    return http.put(`/users/${id}`, data);
};
export const getAllUsers = () => {
    return http.get("/users");
};

export const getUser = (id) => {
    return http.get(`/users/${id}`);
};

export const createUser = (data) => {
    return http.post("/users", data);
};

export const getBorrowedBooks = (id) => {
    return http.get(`/users/${id}/books`);
};