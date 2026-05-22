// library system. this is the db module. typescript/bun/elysia
// ## Schema
// - books(bookid, title, subject, author, language, bookid) id is the primary key and we can use ISBN as the bookid
// - book_issue(issueid, bookid, memberid, issue_date, return_date)
// - members(id, name, email, phone, address)
// ## Notes
// - languages - english, french, arabic, german, spanish
// ## functions
// ### members
// - get all members
// - create member
// - get member by id
// ### books
// - get all books
// - create book
// - get book by id
// ### book issues
// - get all book issues
// - create book issue
// - delete book issue

import { Database } from 'bun:sqlite';
const db = new Database('library.db');
import type { Member, Book, BookIssue } from '../models/index';
import type { BookBase, BookIssueBase, MemberBase } from '../resources';


function table_create():void{
    db.query('CREATE TABLE IF NOT EXISTS books (bookid INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, subject TEXT, author TEXT, language TEXT)').run();
    db.query('CREATE TABLE IF NOT EXISTS book_issue (issueid INTEGER PRIMARY KEY AUTOINCREMENT, bookid INTEGER, memberid INTEGER, issue_date TEXT, REFERENCES books(bookid), FOREIGN KEY (memberid) REFERENCES members(memberid))').run();
    db.query('CREATE TABLE IF NOT EXISTS members (memberid INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT, address TEXT)').run();
}

function addConstraints():void{
    db.query('ALTER TABLE book_issue ADD CONSTRAINT fk_bookid FOREIGN KEY (bookid) REFERENCES books(bookid)').run();
    db.query('ALTER TABLE book_issue ADD CONSTRAINT fk_memberid FOREIGN KEY (memberid) REFERENCES members(memberid)').run();
}



//Member functions
function getAllMembers(): Member[]{
    const members = db.query('SELECT * FROM members').all();
    return members as Member[];
}

function getMemberById(id:number): Member {
    const member = db.query('SELECT * FROM members WHERE memberid = ?').get(id);
    return member as Member;
}

function createMember(member:MemberBase): Member {
    db.query('INSERT INTO members (name, email, phone, address) VALUES (?, ?, ?, ?)').run(member.name, member.email, member.phone, member.address);
    return {
        ...member,
        memberid: db.lastInsertRowid as number,
    } as Member;
}


//Book functions
function getBookById(id:number): Book {
    const book = db.query('SELECT * FROM books WHERE bookid = ?').get(id);
    return book as Book;
}

function getAllBooks():Book[]{
    const books = db.query('SELECT * FROM books').all();
    return books as Book[];
}

function createBooks(book:BookBase): Book {
    db.query('INSERT INTO books (title, subject, author, language) VALUES (?, ?, ?, ?)').run(book.title, book.subject, book.author, book.language);
    return {
        ...book,
        bookid: db.lastInsertRowid as number,
    } as Book;
}

//book issue functions


function getAllBookIssues(): BookIssue[] {
    const book_issues = db.query('SELECT * FROM book_issue').all();
    return book_issues as BookIssue[];
}

function createBookIssue(book_issue:BookIssueBase): BookIssue {
    // create now date
    const issue_date = new Date().toISOString();
    db.query('INSERT INTO book_issue (bookid, memberid, issue_date) VALUES (?, ?, ?)').run(book_issue.bookId, book_issue.memberId, issue_date);
    
    return {
        bookid: book_issue.bookId,
        memberid: book_issue.memberId,
        issueid: db.lastInsertRowid as number,
        issue_date: issue_date,
    } as BookIssue;
}

function deleteBookIssue(id:number): void {
    db.query('DELETE FROM book_issue WHERE issueid = ?').run(id);
}

function getBookIssueByMemberId(memberid:number): BookIssue[] {
    const book_issues = db.query('SELECT * FROM book_issue WHERE memberid = ?').all(memberid);
    return book_issues as BookIssue[];
}

export {
    createMember as createMemberInDB, 
    getAllMembers as getAllMembersFromDB, 
    getMemberById as getMemberByIdFromDB, 
    createBooks as createBooksInDB, 
    getBookById as getBookByIdFromDB, 
    getAllBooks as getAllBooksFromDB, 
    getAllBookIssues as getAllBookIssuesFromDB, 
    createBookIssue as createBookIssueInDB, 
    deleteBookIssue as deleteBookIssueFromDB,
    getBookIssueByMemberId as getBookIssueByMemberIdFromDB
};