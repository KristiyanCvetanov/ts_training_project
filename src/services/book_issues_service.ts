import type { BookIssue } from "../models/index";
import type { BookIssueBase } from "../resources";

import {
    createBookIssueInDB,
    getAllBookIssuesFromDB,
    getBookIssueByMemberIdFromDB,
    deleteBookIssueFromDB
} from "../db/db";

function createBookIssue(book_issue: BookIssueBase): BookIssue {
    
    return createBookIssueInDB(book_issue);
}

function getAllBookIssues(): BookIssue[] {
    return getAllBookIssuesFromDB();
}

function getBookIssueByMemberId(memberid: number): BookIssue[] {
    return getBookIssueByMemberIdFromDB(memberid);
}

function deleteBookIssue(id: number): void {
    deleteBookIssueFromDB(id);
}

export { createBookIssue, getAllBookIssues, getBookIssueByMemberId, deleteBookIssue };