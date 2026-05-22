import type { BookIssue } from "../models/index";
import type { BookIssueBase } from "../resources";

import {
    createBookIssueInDB,
    getAllBookIssuesFromDB,
    getBookIssueByMemberIdFromDB,
    getBookIssueByIdFromDB,
    deleteBookIssueFromDB
} from "../db/db";

import { 
    validate_memberid, 
    validate_bookid, 
    validate_member_issue_count,
    validate_bookissued,
    validate_issueid
} from "../validations/validations";

function createBookIssue(book_issue: BookIssueBase): BookIssue {
    validate_memberid(book_issue.memberId);
    validate_bookid(book_issue.bookId);
    validate_member_issue_count(book_issue.memberId);
    validate_bookissued(book_issue.bookId);
    return createBookIssueInDB(book_issue);
}

function getAllBookIssues(): BookIssue[] {
    return getAllBookIssuesFromDB();
}

function getBookIssueByMemberId(memberid: number): BookIssue[] {
    return getBookIssueByMemberIdFromDB(memberid);
}

function getBookIssueById(id: number): BookIssue {
    validate_issueid(id);
    return getBookIssueByIdFromDB(id);
}

function deleteBookIssue(id: number): void {
    validate_issueid(id);
    deleteBookIssueFromDB(id);
}

export { createBookIssue, getAllBookIssues, getBookIssueByMemberId, getBookIssueById, deleteBookIssue };