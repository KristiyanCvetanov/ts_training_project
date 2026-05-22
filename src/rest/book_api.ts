import { Elysia } from "elysia"
import type { ErrorResponse } from "../resources/index"

export const bookApi = new Elysia( { prefix: "/books" } )
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

    .get("/:id", ({ params }): ErrorResponse => {
        // TODO: fetch the the DB
        // TODO: add schemas and validations
        return {
            success: false,
            message: "Not implemented"
        };
    })