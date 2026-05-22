/*
# validations layer for the library system

## Members
### name
- 3 symbols min
- 100 symbols max
- only letters and spaces
- no numbers or special characters
### email
- valid email address
### phone
- no special characters
- no spaces

## Books
### title
- 2 symbols min
- 100 symbols max
- only letters and spaces
- no numbers or special characters
### subject
- 3 symbols min
- 100 symbols max
- only letters and spaces
- no numbers or special characters
### author
- 3 symbols min
- 100 symbols max
- only letters and spaces
- no numbers or special characters
### language
- english, french, arabic, german, spanish

## Book Issues
## memberid 
- valid memberid
### bookid
- valid bookid
### issue date
- valid date
### general
- book not already issued
- member hasn't issued more than 3 books
### issue_date
- valid date
*/

import { t } from "elysia";
import type { Member, Book } from "../models/index";
import { getMemberByIdFromDB, getBookByIdFromDB, getBookIssueByMemberIdFromDB, getBookIssueByBookIdFromDB } from "../db/db";
import { ValidationError } from "../errors/validation_error";

const validation_member = t.Object({
    name: t.String({
        minLength:3, 
        maxLength:100,
        pattern: "^[a-zA-Z\\s]+$"
    }),
    email: t.String({format: "email"}),
    phone: t.String({
        minLength:8, 
        maxLength:100,
        pattern: "^[0-9]+$"
    }),
    address: t.String({
        minLength:5,
        maxLength:100,
        pattern: "^[a-zA-Z\\s]+$"
    })
})

const validation_book = t.Object({
    title: t.String({minLength:2, maxLength:100}),
    subject: t.String({minLength:2, maxLength:100}),
    author: t.String({minLength:3, maxLength:100}),
    language: t.Union([
        t.Literal("English"),
        t.Literal("French"),
        t.Literal("Arabic"),
        t.Literal("German"),
        t.Literal("Spanish"),
    ]),
})

const validation_book_issue = t.Object({
    memberId: t.Integer(),
    bookId: t.Integer()
})

const validation_param_member_id = t.Object({
    memberId: t.Integer(),
})

const validation_param_book_id = t.Object({
    bookId: t.Integer(),
})

const validation_param_book_issue_id = t.Object({
    issueId: t.Integer(),
})


function validate_memberid(memberid: number): void {
    const member = getMemberByIdFromDB(memberid);
    if (!member) {
        throw new ValidationError("Member not found");
    }
}

function validate_bookissued(bookid: number): void {
    const bookIssue = getBookIssueByBookIdFromDB(bookid);
    if (bookIssue) {
        throw new ValidationError("Book already issued");
    }
}

function validate_bookid(bookid: number): void {
    const book = getBookByIdFromDB(bookid);
    if (!book) {
        throw new ValidationError("Book not found");    
    }
}

function validate_member_issue_count(memberid: number): void {
    const issues = getBookIssueByMemberIdFromDB(memberid);
    if (issues.length >= 3) {
        throw new ValidationError("Member has already issued 3 books");
    }
}

export { 
    validation_member,
    validation_book,
    validation_book_issue,
    validate_memberid,
    validate_bookissued,
    validate_bookid,
    validate_member_issue_count,
    validation_param_member_id,
    validation_param_book_id,
    validation_param_book_issue_id
};
