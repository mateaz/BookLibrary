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

export const getUserByName = (userName) => {
    return http.get(`/users/?userName=${userName}`);
};

export const createUser = (data) => {
    return http.post("/users", data);
};

export const getBorrowedBooks = (id) => {
    return http.get(`/users/${id}/books`);
};

//http://localhost:4000/subjects?name=social%20studies