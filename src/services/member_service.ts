import type { Member } from "../models/index";
import type { MemberBase } from "../resources";

import {
    createMemberInDB,
    getMemberByIdFromDB,
    getAllMembersFromDB
} from "../db/db";

import {
    validate_memberid
} from "../validations/validations";

function createMember(member: MemberBase): Member {
    return createMemberInDB(member);
}

function getMemberById(id: number): Member {
    validate_memberid(id);
    return getMemberByIdFromDB(id);
}

function getAllMembers(): Member[] {
    return getAllMembersFromDB();
}

export { createMember, getMemberById, getAllMembers };