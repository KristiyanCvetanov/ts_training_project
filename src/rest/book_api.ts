import { Elysia } from "elysia"
import type { BookBase, BookResponse, StatusResponse } from "../resources/index"

import { createBook, getAllBooks, getBookById } from "../services/books_service";
import type { Book } from "../models";

import { validation_book, validation_param_book_id } from "../validations/validations";

export const bookApi = new Elysia( { prefix: "/books" } )
    .post("/", ({ body }: { body: BookBase }): BookResponse | StatusResponse => {
        const book: Book = createBook(body);

        // TODO: add error handling
        return mapBookToResponse(book);
    }, {
        body: validation_book
    })

    .get("/", (): BookResponse[] | StatusResponse => {
        const books: Book[] = getAllBooks();
        
        // TODO: add error handling
        return books.map((book) => mapBookToResponse(book));
    })

    .get("/:bookId", ({ params }: { params: { bookId: number } }): BookResponse | StatusResponse => {
        const book: Book = getBookById(params.bookId);

        // TODO: add error handling
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