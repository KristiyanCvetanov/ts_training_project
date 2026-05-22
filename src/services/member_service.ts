import type { Member } from "../models/index";
import type { MemberBase } from "../resources";

import {
    createMemberInDB,
    getMemberByIdFromDB,
    getAllMembersFromDB
} from "../db/db";

function createMember(member: MemberBase): Member {
    return createMemberInDB(member);
}

function getMemberById(id: number): Member {
    return getMemberByIdFromDB(id);
}

function getAllMembers(): Member[] {
    return getAllMembersFromDB();
}