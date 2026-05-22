import { Elysia } from "elysia"
import type { ErrorResponse } from "../resources/index"

export const bookIssuesApi = new Elysia( { prefix: "/issues" } )
    .post("/", ({ body }): ErrorResponse => {
        // TODO: store in the DB
        // TODO: add schemas and validations
        return {
            success: false,
            message: "Not implemented"
        }
    })

    .get("/", (): | ErrorResponse => {
        // TODO: store in the DB
        // TODO: add schemas and validations
        return {
            success: false,
            message: "Not implemented"
        }
    })

    .delete("/:id", ({ params }): ErrorResponse => {
        // TODO: fetch the the DB
        // TODO: add schemas and validations
        return {
            success: false,
            message: "Not implemented"
        };
    })