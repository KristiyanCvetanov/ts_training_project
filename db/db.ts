// library system. this is the db module. typescript/bun/elysia
// ## Schema
// - books(bookid, title, subject, author, language, bookid) id is the primary key and we can use ISBN as the bookid
// - book_issue(issueid, bookid, memberid, issue_date, return_date)
// - members(id, name, email, phone, address)
// ## Notes
// - languages - english, french, arabic, german, spanish

import { Database } from 'bun:sqlite';
const db = new Database('library.db');

function table_create():void{
    db.query('CREATE TABLE IF NOT EXISTS books (bookid INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, subject TEXT, author TEXT, language TEXT)').run();
    db.query('CREATE TABLE IF NOT EXISTS book_issue (issueid INTEGER PRIMARY KEY AUTOINCREMENT, bookid INTEGER, memberid INTEGER, issue_date TEXT, return_date TEXT)').run();
    db.query('CREATE TABLE IF NOT EXISTS members (memberid INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT, address TEXT)').run();
}

table_create();