export class BaseResponse {
  status: string;
  statusCode: number;
  message: string;

  public isSuccessful(): boolean {
    return status === 'success';
  }
}
