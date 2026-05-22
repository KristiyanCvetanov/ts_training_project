import { Elysia } from "elysia"
import { memberApi } from "./member_api"
import { bookApi } from "./book_api"
import { bookIssuesApi } from "./book_issues_api"

let port: number = 3000

const app = new Elysia()
    .use(memberApi)
    .use(bookApi)
    .use(bookIssuesApi)
    .listen(port)

console.log(`Server is running on ${app.server?.hostname}:${app.server?.port}`)