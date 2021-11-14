import http from "../http-common";

export const updateBook = (id, data) => {
    return http.put(`/books/${id}`, data);
};
export const getAllBooks = () => {
    return http.get("/books");
};

export const getBook = (id) => {
    return http.get(`/books/${id}`);
};

export const createBook = (data) => {
    return http.post("/books", data);
};

export const getAllBooksWithBorrowState = () => {
    return http.get("/books?_embed=borrowState");
};
