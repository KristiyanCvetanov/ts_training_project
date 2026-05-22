import type { StatusResponse } from "../resources";
import { ValidationError } from "./validation_error";

export function handleError(error: unknown): StatusResponse {
    if (error instanceof ValidationError) {
        return { success: false, message: error.message } as StatusResponse;
    }
    return { success: false, message: "Internal server error" } as StatusResponse;
}