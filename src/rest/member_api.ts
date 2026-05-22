import { Elysia } from "elysia"
import type { MemberBase, MemberResponse, StatusResponse } from "../resources/index"
import { createMember, getMemberById, getAllMembers } from "../services/member_service"
import type { Member } from "../models";

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
    
    .get("/:id/issues", ({ params }):  StatusResponse => {
        // TODO: fetch the the DB
        // TODO: add schemas and validations
        return {
            success: false,
            message: "Not implemented"
        };
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