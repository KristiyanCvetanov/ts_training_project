import type { Book } from "../models/index";
import type { BookBase } from "../resources";

import {
    createBooksInDB,
    getAllBooksFromDB,
    getBookByIdFromDB
} from "../db/db";

function createBook(book: BookBase): Book {
    return createBooksInDB(book);
}

function getAllBooks(): Book[] {
    return getAllBooksFromDB();
}

function getBookById(id: number): Book {
    return getBookByIdFromDB(id);
}

export { createBook, getAllBooks, getBookById };