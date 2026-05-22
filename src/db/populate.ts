import { Database } from 'bun:sqlite';
const db = new Database('library.db');

function table_drop():void{
    db.query('DROP TABLE IF EXISTS members').run();
    db.query('DROP TABLE IF EXISTS books').run();
    db.query('DROP TABLE IF EXISTS book_issue').run();
}

function table_create():void{
    db.query('CREATE TABLE IF NOT EXISTS members (memberid INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT, address TEXT)').run();
    db.query('CREATE TABLE IF NOT EXISTS books (bookid INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, subject TEXT, author TEXT, language TEXT)').run();
    db.query('CREATE TABLE IF NOT EXISTS book_issue (issueid INTEGER PRIMARY KEY AUTOINCREMENT, bookid INTEGER, memberid INTEGER, issue_date TEXT, REFERENCES books(bookid), FOREIGN KEY (memberid) REFERENCES members(memberid))').run();
}

function addConstraints():void{
    db.query('ALTER TABLE book_issue ADD CONSTRAINT fk_bookid FOREIGN KEY (bookid) REFERENCES books(bookid)').run();
    db.query('ALTER TABLE book_issue ADD CONSTRAINT fk_memberid FOREIGN KEY (memberid) REFERENCES members(memberid)').run();
}

function populate_members():void{
    db.query('INSERT INTO members (name, email, phone, address) VALUES (?, ?, ?, ?)').run('John Doe', 'john.doe@example.com', '1234567890', '123 Main St, Anytown, USA');
    db.query('INSERT INTO members (name, email, phone, address) VALUES (?, ?, ?, ?)').run('Jane Doe', 'jane.doe@example.com', '0987654321', '456 Main St, Anytown, USA');
    db.query('INSERT INTO members (name, email, phone, address) VALUES (?, ?, ?, ?)').run('Jim Doe', 'jim.doe@example.com', '1112223333', '789 Main St, Anytown, USA');
}

function populate_books():void{
    db.query('INSERT INTO books (title, subject, author, language) VALUES (?, ?, ?, ?)').run('The Great Gatsby', 'Fiction', 'F. Scott Fitzgerald', 'Spanish');
    db.query('INSERT INTO books (title, subject, author, language) VALUES (?, ?, ?, ?)').run('1984', 'Dystopian', 'George Orwell', 'English');
    db.query('INSERT INTO books (title, subject, author, language) VALUES (?, ?, ?, ?)').run('To Kill a Mockingbird', 'Southern Gothic', 'Harper Lee', 'English');
}

function populate_book_issue():void{
    db.query('INSERT INTO book_issue (bookid, memberid, issue_date) VALUES (?, ?, ?)').run(1, 1, new Date().toISOString());
    db.query('INSERT INTO book_issue (bookid, memberid, issue_date) VALUES (?, ?, ?)').run(2, 3, new Date().toISOString());
}


table_drop();
table_create();
addConstraints();
populate_members();
populate_books();
populate_book_issue();