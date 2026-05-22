import { Database } from 'bun:sqlite';
const db = new Database('library.db');

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



populate_members();
populate_books();
populate_book_issue();