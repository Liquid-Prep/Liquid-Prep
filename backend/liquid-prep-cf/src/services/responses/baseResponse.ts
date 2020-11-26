import { ApiResponse } from "src/constants/apiResponse";
import { ErrorMessages } from "src/constants/errorMessages";
import { APIResponse } from "src/models/apiResponse";

export class BaseResponse {

    public successResponse(data:object, message: string) {
        let response = new APIResponse(
            ApiResponse.SUCCESS_STATUS,
            ApiResponse.SUCCESS_OK,
            data,
            message
          );

          return response;
    }

    public errorResponse(message: string) {
        let response = new APIResponse(
            ApiResponse.ERROR_STATUS,
            ApiResponse.INETRNAL_SERVER_ERROR,
            null,
            message,
        );
        return response;
    }

    public generateResponse(data: object, message: string) {
        let response = null;
          if(data){
            this.successResponse(data, message);
          } else {
            this.errorResponse(ErrorMessages.GENERIC_ERROR_MESSAGE);
          }

        return response;
    }
}