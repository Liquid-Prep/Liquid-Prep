export class APIResponse {
    public status: string;
    public statusCode: number;
    public data: any;
    public message: string;
    public headers: Object;

    public constructor(status: string, statusCode: number, data: any, message: string, headers: Object) {
        this.status = status;
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.headers = headers;
    }
}