import { Elysia } from "elysia"
import type { MemberBase, MemberResponse, StatusResponse, BookIssueResponse } from "../resources/index"
import { createMember, getMemberById, getAllMembers } from "../services/member_service"
import type { BookIssue, Member } from "../models";

import { validation_member, validation_param_member_id } from "../validations/validations";
import { getBookIssueByMemberId } from "../services/book_issues_service";
import { mapBookIssueToResponse } from "./book_issues_api";

export const memberApi = new Elysia( { prefix: "/members" } )
    .post("/", ({ body }: { body: MemberBase }): MemberResponse | StatusResponse => {
        // TODO: add error handling
        const member: Member = createMember(body);

        return mapMemberToResponse(member);
    }, {
        body: validation_member
    })

    .get("/", (): MemberResponse[] | StatusResponse => {
        const members: Member[] = getAllMembers();

        // TODO: add error handling
        return members.map((member) => mapMemberToResponse(member));
    })

    .get("/:memberId", ({ params }: { params: { memberId: number } }): MemberResponse | StatusResponse => {
        const member: Member = getMemberById(params.memberId);

        // TODO: add error handling
        return mapMemberToResponse(member);
    }, {
        params: validation_param_member_id
    })

    .get("/:memberId/issues", ({ params }: { params: { memberId: number } }): BookIssueResponse[] | StatusResponse => {
        const book_issues: BookIssue[] = getBookIssueByMemberId(params.memberId);

        // TODO: add error handling
        return book_issues.map((book_issue) => mapBookIssueToResponse(book_issue));
    }, {
        params: validation_param_member_id
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