import { Elysia } from "elysia"
import type { BookIssueBase, BookIssueResponse, StatusResponse, BookIssueContent } from "../resources/index"

import { createBookIssue, getAllBookIssues, deleteBookIssue } from "../services/book_issues_service";
import type { BookIssue } from "../models";
import { validation_book_issue, validation_param_book_issue_id } from "../validations/validations";

export const bookIssuesApi = new Elysia( { prefix: "/issues" } )
    .post("/", ({ body }: { body: BookIssueBase }): BookIssueResponse | StatusResponse => {
        const book_issue: BookIssue = createBookIssue(body);
        
        // TODO: add error handling
        return mapBookIssueToResponse(book_issue);
    }, {
        body: validation_book_issue
    })

    .get("/", (): BookIssueResponse[] | StatusResponse => {
        const book_issues: BookIssue[] = getAllBookIssues();

        // TODO: add error handling
        return book_issues.map((book_issue) => mapBookIssueToResponse(book_issue));
    })

    .delete("/:issueId", ({ params }: { params: { issueId: number } }): StatusResponse => {
        const book_issue: BookIssue = getBookIssueById(params.issueId);
        deleteBookIssue(params.issueId);

        // TODO: add error handling
        return mapBookIssueToResponse(book_issue);
    }, {
        params: validation_param_book_issue_id
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

function getBookIssueById(id: number): BookIssue {
    throw new Error("Function not implemented.");
}
