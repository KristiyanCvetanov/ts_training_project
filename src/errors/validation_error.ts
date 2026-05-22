
class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "BookValidationErrors";
    }
}

export { ValidationError };