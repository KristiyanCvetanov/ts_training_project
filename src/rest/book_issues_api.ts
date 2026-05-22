import { Elysia } from "elysia"
import type { BookIssueBase, BookIssueResponse, StatusResponse, BookIssueContent } from "../resources/index"

import { createBookIssue, getAllBookIssues, deleteBookIssue } from "../services/book_issues_service";
import type { BookIssue } from "../models";

export const bookIssuesApi = new Elysia( { prefix: "/issues" } )
    .post("/", ({ body }: { body: BookIssueBase }): BookIssueResponse | StatusResponse => {
        const book_issue: BookIssue = createBookIssue(body);
        
        // TODO: add schemas and validations
        return mapBookIssueToResponse(book_issue);
    })

    .get("/", (): BookIssueResponse[] | StatusResponse => {
        const book_issues: BookIssue[] = getAllBookIssues();

        // TODO: add schemas and validations
        return book_issues.map((book_issue) => mapBookIssueToResponse(book_issue));
    })

    .delete("/:id", ({ params }: { params: { id: number } }): StatusResponse => {
        deleteBookIssue(params.id);

        // TODO: add schemas and validations
        return mapBookIssueToResponse(book_issue);
    })

export function mapBookIssueToResponse(book_issue: BookIssue): BookIssueResponse {
    return {
        success: true,
        message: "Book issue created successfully",
        issue: {
            issueId: book_issue.issueid,
            issueDate: new Date(book_issue.issue_date),
            bookId: book_issue.bookid,
            memberId: book_issue.memberid
        } as BookIssueContent
    };
}