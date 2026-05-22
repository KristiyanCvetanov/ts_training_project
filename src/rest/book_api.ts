import { Elysia } from "elysia"
import type { BookBase, BookResponse, StatusResponse } from "../resources/index"

import { createBook, getAllBooks, getBookById } from "../services/books_service";
import type { Book } from "../models";

export const bookApi = new Elysia( { prefix: "/books" } )
    .post("/", ({ body }: { body: BookBase }): BookResponse | StatusResponse => {
        const book: Book = createBook(body);
        // TODO: add schemas and validations
        // TODO: add error handling
        return mapBookToResponse(book);
    })

    .get("/", (): BookResponse[] | StatusResponse => {
        const books: Book[] = getAllBooks();
        // TODO: add schemas and validations
        // TODO: add error handling
        return books.map((book) => mapBookToResponse(book));
    })

    .get("/:id", ({ params }: { params: { id: number } }): BookResponse | StatusResponse => {
        const book: Book = getBookById(params.id);

        // TODO: add schemas and validations
        // TODO: add error handling
        return mapBookToResponse(book);
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