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
import { getMemberByIdFromDB, getBookByIdFromDB, getBookIssueByMemberIdFromDB } from "../db/db";


const validation_member = t.Object({
    name: t.String({
        minLength:3, 
        maxLength:100,
        pattern: "^[a-zA-Z\\s]+$"
    }),
    email: t.String({format: "email"}),
    phone: t.String({
        minLength:3, 
        maxLength:100,
        pattern: "^[0-9]+$"
    }),
    address: t.String({
        minLength:3,
        maxLength:100,
        pattern: "^[a-zA-Z\\s]+$"
    })
})

const validation_book = t.Object({
    title: t.String({minLength:2, maxLength:100}),
    subject: t.String({minLength:3, maxLength:100}),
    author: t.String({minLength:3, maxLength:100}),
    language: t.Union([
        t.Literal("english"),
        t.Literal("french"),
        t.Literal("arabic"),
        t.Literal("german"),
        t.Literal("spanish"),
    ]),
})

const validation_book_issue = t.Object({
    memberid: t.Numeric(),
    bookid: t.Numeric(),
    issue_date: t.String({format: "date"}),
})

function bookissue_validate_memberid(memberid: number): Member {
    const member = getMemberByIdFromDB(memberid);
    if (!member) {
        throw new Error("Member not found");
    }
    return member;
}

function bookissue_validate_member_issues(memberid: number): void {
    const issues = getBookIssueByMemberIdFromDB(memberid);
    if (issues.length >= 3) {
        throw new Error("Member has already issued 3 books");
    }
}

function bookissue_validate_bookid(bookid: number): Book {
    const book = getBookByIdFromDB(bookid);
    if (!book) {
        throw new Error("Book not found");
    }
    return book;
}

function bookissue_validate_member_issue_count(memberid: number): void {
    const issues = getBookIssueByMemberIdFromDB(memberid);
    if (issues.length >= 3) {
        throw new Error("Member has already issued 3 books");
    }
}

export { validation_member, validation_book, validation_book_issue, bookissue_validate_memberid, bookissue_validate_member_issues, bookissue_validate_bookid, bookissue_validate_member_issue_count };