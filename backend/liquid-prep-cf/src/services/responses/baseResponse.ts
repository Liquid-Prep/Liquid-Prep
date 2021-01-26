import { ApiResponse } from "src/constants/apiResponse";
import { ErrorMessages } from "src/constants/errorMessages";
import { APIResponse } from "src/models/apiResponse";

export class BaseResponse {

    private headers: Object = {'Content-Type': 'application/json'};

    public successResponse(data: any, message: string): APIResponse {
        return new APIResponse(
            ApiResponse.SUCCESS_STATUS,
            ApiResponse.SUCCESS_OK,
            data,
            message,
            this.headers
        );
    }

    public errorResponse(message: string): APIResponse {
        return new APIResponse(
            ApiResponse.ERROR_STATUS,
            ApiResponse.INETRNAL_SERVER_ERROR,
            null,
            message,
            this.headers
        );
    }

    public generateResponse(data: any, message: string) {
        let response = null;
        if(data){
            response = this.successResponse(data, message);
        } else {
            response = this.errorResponse(ErrorMessages.GENERIC_ERROR_MESSAGE);
        }
        return response;
    }
}