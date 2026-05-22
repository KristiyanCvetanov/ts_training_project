import { Elysia } from "elysia"
import type { MemberBase, MemberResponse, StatusResponse, BookIssueResponse } from "../resources/index"
import { createMember, getMemberById, getAllMembers } from "../services/member_service"
import type { BookIssue, Member } from "../models";

import { validation_member, validation_param_member_id } from "../validations/validations";
import { getBookIssueByMemberId } from "../services/book_issues_service";
import { mapBookIssueToResponse } from "./book_issues_api";
import { handleError } from "../errors/error_util";

export const memberApi = new Elysia( { prefix: "/members" } )
    .post("/", ({ body }: { body: MemberBase }): MemberResponse | StatusResponse => {
        let member: Member;

        try {
            member = createMember(body);
        } catch (error: unknown) {
            return handleError(error);
        }

        return mapMemberToResponse(member);
    }, {
        body: validation_member
    })

    .get("/", (): MemberResponse[] | StatusResponse => {
        let members: Member[];

        try {
            members = getAllMembers();
        } catch (error: unknown) {
            return handleError(error);
        }
        return members.map((member) => mapMemberToResponse(member));
    })

    .get("/:memberId", ({ params }: { params: { memberId: number } }): MemberResponse | StatusResponse => {
        let member: Member;

        try {
            member = getMemberById(params.memberId);
        } catch (error: unknown) {
            return handleError(error);
        }

        return mapMemberToResponse(member);
    }, {
        params: validation_param_member_id
    })

    .get("/:memberId/issues", ({ params }: { params: { memberId: number } }): BookIssueResponse[] | StatusResponse => {
        let book_issues: BookIssue[];

        try {
            book_issues = getBookIssueByMemberId(params.memberId);
        } catch (error: unknown) {
            return handleError(error);
        }

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