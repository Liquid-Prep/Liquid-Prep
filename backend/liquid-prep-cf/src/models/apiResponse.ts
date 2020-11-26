export class APIResponse {
    public status: string;
    public statusCode: number;
    public data: object;
    public message: string;

    public constructor(status: string, statusCode: number, data: object, message: string) {
        this.status = status;
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
    }
}