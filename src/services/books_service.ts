import type { Book } from "../models/index";
import type { BookBase } from "../resources";

import {
    createBooksInDB,
    getAllBooksFromDB,
    getBookByIdFromDB
} from "../db/db";

import {
    validate_bookid
} from "../validations/validations";


function createBook(book: BookBase): Book {
    return createBooksInDB(book);
}

function getAllBooks(): Book[] {
    return getAllBooksFromDB();
}

function getBookById(id: number): Book {
    validate_bookid(id);
    return getBookByIdFromDB(id);
}

export { createBook, getAllBooks, getBookById };