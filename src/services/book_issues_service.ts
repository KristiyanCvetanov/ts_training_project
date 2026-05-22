import type { BookIssue } from "../models/index";
import type { BookIssueBase } from "../resources";

import {
    createBookIssueInDB,
    getAllBookIssuesFromDB,
    getBookIssueByMemberIdFromDB,
    deleteBookIssueFromDB
} from "../db/db";

import { 
    validate_memberid, 
    validate_bookid, 
    validate_member_issue_count,
    validate_bookissued 
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

function deleteBookIssue(id: number): void {
    validate_bookissued(id);
    deleteBookIssueFromDB(id);
}

export { createBookIssue, getAllBookIssues, getBookIssueByMemberId, deleteBookIssue };