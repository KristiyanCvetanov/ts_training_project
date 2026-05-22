import { Elysia } from "elysia"
import type { MemberBase, MemberResponse, ErrorResponse } from "../models/index"

const app = new Elysia()
let port: number = 3000

app.post("/members", ({ body }): MemberResponse | ErrorResponse => {
    // TODO: store in the DB
    // TODO: add schemas and validations
    return {
        success: false,
        message: "Not implemented"
    }
})

app.get("/members", (): MemberResponse[] | ErrorResponse => {
    // TODO: store in the DB
    // TODO: add schemas and validations
    return {
        success: false,
        message: "Not implemented"
    }
})

app.get("/members/:id", ({ params }): MemberResponse | ErrorResponse => {
    // TODO: fetch the the DB
    // TODO: add schemas and validations
    return {
        success: false,
        message: "Not implemented"
    };
})

app.listen(port)
console.log(`Server is running on ${app.server?.hostname}:${app.server?.port}`)