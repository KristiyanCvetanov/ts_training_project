import { Elysia } from "elysia"
import type { BookBase, BookResponse, StatusResponse } from "../resources/index"

import { createBook, getAllBooks, getBookById } from "../services/books_service";
import type { Book } from "../models";

import { validation_book, validation_param_book_id } from "../validations/validations";
import { handleError } from "../errors/error_util";

export const bookApi = new Elysia( { prefix: "/books" } )
    .post("/", ({ body }: { body: BookBase }): BookResponse | StatusResponse => {
        let book: Book;

        try {
           book = createBook(body);
        } catch (error: unknown) {
            return handleError(error);
        }
        
        return mapBookToResponse(book);
    }, {
        body: validation_book
    })

    .get("/", (): BookResponse[] | StatusResponse => {
        let books: Book[];

        try {
            books = getAllBooks();
        } catch (error: unknown) {
            return handleError(error);
        }
        
        return books.map((book) => mapBookToResponse(book));
    })

    .get("/:bookId", ({ params }: { params: { bookId: number } }): BookResponse | StatusResponse => {
        let book: Book;

        try {
            book = getBookById(params.bookId);
        } catch (error: unknown) {
            return handleError(error);
        }

        return mapBookToResponse(book);
    }, {
        params: validation_param_book_id
    })

function mapBookToResponse(book: Book): BookResponse {
    return {
        id: book.bookid,
        title: book.title,
        subject: book.subject,
        author: book.author,
        language: book.language
    };
}