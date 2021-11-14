import http from "../http-common";

export const getAllBorrowedBooks = () => {
    return http.get("/borrowState?_expand=book");
}

export const deleteBorrowedBook = (id) => {
    return http.delete(`/borrowState/${id}`);
};

export const createBorrowedBook = (data) => {
    return http.post("/borrowState", data);
};