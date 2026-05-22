import { Elysia } from "elysia"
import type { MemberBase, MemberResponse, ErrorResponse } from "../resources/index"

export const memberApi = new Elysia( { prefix: "/members" } )
    .post("/", ({ body }): MemberResponse | ErrorResponse => {
        // TODO: store in the DB
        // TODO: add schemas and validations
        return {
            success: false,
            message: "Not implemented"
        }
    })

    .get("/", (): MemberResponse[] | ErrorResponse => {
        // TODO: store in the DB
        // TODO: add schemas and validations
        return {
            success: false,
            message: "Not implemented"
        }
    })

    .get("/:id", ({ params }): MemberResponse | ErrorResponse => {
        // TODO: fetch the the DB
        // TODO: add schemas and validations
        return {
            success: false,
            message: "Not implemented"
        };
    })
