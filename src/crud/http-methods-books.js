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

export const getBorrowedBooks = () => {
    return http.get("/borrowState?_expand=book");
}

/*export const updateBorrowedBooks = (id, data) => {
    return http.put(`/borrowState?_expand=book/${id}`, data);
};*/

export const deleteBorrowedBook = (id) => {
    return http.delete(`/borrowState?/${id}`);
};