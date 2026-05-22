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
function get_all_members():Member[]{
    const members = db.query('SELECT * FROM members').all();
    return members as Member[];
}

function get_member_by_id(id:number):Member{
    const member = db.query('SELECT * FROM members WHERE memberid = ?').get(id);
    return member as Member;
}

function create_member(member:Member):Member{
    db.query('INSERT INTO members (name, email, phone, address) VALUES (?, ?, ?, ?)').run(member.name, member.email, member.phone, member.address);
    return {
        ...member,
        memberid: db.lastInsertRowid as number,
    } as Member;
}


//Book functions
function get_book_by_id(id:number):Book{
    const book = db.query('SELECT * FROM books WHERE bookid = ?').get(id);
    return book as Book;
}

function get_all_books():Book[]{
    const books = db.query('SELECT * FROM books').all();
    return books as Book[];
}

function create_book(book:Book):Book{
    db.query('INSERT INTO books (title, subject, author, language) VALUES (?, ?, ?, ?)').run(book.title, book.subject, book.author, book.language);
    return {
        ...book,
        bookid: db.lastInsertRowid as number,
    } as Book;
}

//book issue functions


function get_all_book_issues():BookIssue[]{
    const book_issues = db.query('SELECT * FROM book_issue').all();
    return book_issues as BookIssue[];
}

function create_book_issue(book_issue:BookIssue):BookIssue{
    db.query('INSERT INTO book_issue (bookid, memberid, issue_date) VALUES (?, ?, ?)').run(book_issue.bookid, book_issue.memberid, book_issue.issue_date);
    return {
        ...book_issue,
        issueid: db.lastInsertRowid as number,
    } as BookIssue;
}

function delete_book_issue(id:number):void{
    db.query('DELETE FROM book_issue WHERE issueid = ?').run(id);
}

export {db, get_all_members, get_member_by_id, create_book, get_book_by_id, get_all_books, create_member, get_all_book_issues, create_book_issue, delete_book_issue};