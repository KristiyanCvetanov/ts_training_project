import type { BookIssueBase } from "./book_issue_base";

export interface BookIssueContent extends BookIssueBase {
    issueId: number;
    issueDate: Date;
}