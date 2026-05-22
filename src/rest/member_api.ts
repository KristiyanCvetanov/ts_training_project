import { Elysia } from "elysia"
import type { MemberBase, MemberResponse, StatusResponse, BookIssueResponse } from "../resources/index"
import { createMember, getMemberById, getAllMembers } from "../services/member_service"
import type { BookIssue, Member } from "../models";

import { validation_member } from "../validations/validations";
import { getBookIssueByMemberId } from "../services/book_issues_service";
import { mapBookIssueToResponse } from "./book_issues_api";

export const memberApi = new Elysia( { prefix: "/members" } )
    .post("/", ({ body }: { body: MemberBase }): MemberResponse | StatusResponse => {
        // TODO: add schemas and validations
        // TODO: add error handling
        const member: Member = createMember(body);

        return mapMemberToResponse(member);
    })

    .get("/", (): MemberResponse[] | StatusResponse => {
        const members: Member[] = getAllMembers();

        // TODO: add schemas and validations
        return members.map((member) => mapMemberToResponse(member));
    })

    .get("/:id", ({ params }: { params: { id: number } }): MemberResponse | StatusResponse => {
        const member: Member = getMemberById(params.id);

        // TODO: add schemas and validations
        return mapMemberToResponse(member);
    })

    .get("/:id/issues", ({ params }: { params: { id: number } }): BookIssueResponse[] | StatusResponse => {
        const book_issues: BookIssue[] = getBookIssueByMemberId(params.id);

        // TODO: add schemas and validations
        return book_issues.map((book_issue) => mapBookIssueToResponse(book_issue));
    })

function mapMemberToResponse(member: Member): MemberResponse {
    return {
        id: member.memberid,
        name: member.name,
        email: member.email,
        phone: member.phone,
        address: member.address
    };
}