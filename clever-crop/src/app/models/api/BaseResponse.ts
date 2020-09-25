export class BaseResponse {
  status: string;
  statusCode: string;
  message: string;

  public isSuccessful(): boolean {
    return status === 'success';
  }
}
