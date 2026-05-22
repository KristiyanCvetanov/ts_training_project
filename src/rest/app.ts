import { Elysia } from "elysia"
import { memberApi } from "./member_api"

let port: number = 3000

const app = new Elysia()
    .use(memberApi)
    .listen(port)

console.log(`Server is running on ${app.server?.hostname}:${app.server?.port}`)