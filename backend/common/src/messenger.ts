import { Params } from './params';

export class ResponseMessage {
  constructor (
    public body: string, 
    public headers: Object, 
    public statusCode: number = 200) {
  }
}

export class Messenger {

  constructor (private params: Params) {
  }

  send(body: any, headers = {'Content-Type': 'application/json'}): ResponseMessage {
    return new ResponseMessage(body, headers);
  }

  error(msg: any, status: number) {
    return new ResponseMessage(msg, {'Content-Type': 'application/json'}, status);
  }

  send2(body: any, statusCode: number = 200, contentType = 'application/json; charset=utf-8'): ResponseMessage {
    const headers = {
      'Content-Type': contentType
    };
    return new ResponseMessage(body, headers, statusCode);
  }

}