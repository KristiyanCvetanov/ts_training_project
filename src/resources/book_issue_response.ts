import type { BookIssueContent } from "./book_issue_content";
import type { StatusResponse } from "./status_response";

export interface BookIssueResponse extends StatusResponse {
    issue: BookIssueContent;
}