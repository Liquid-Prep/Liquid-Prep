import { Params } from './params';

export class IftttResponseMessage {
  constructor (
    public data: any, 
    public headers: Object, 
    public statusCode: number = 200) {
  }
}

export class IftttMessenger {

  constructor (private params: Params) {
  }

  send(body: any, statusCode: number = 200, headers = {'Content-Type': 'application/json'}): IftttResponseMessage {
    return new IftttResponseMessage(body, headers);
  }

  error(msg: any, status: number) {
    return new IftttResponseMessage(msg, {'Content-Type': 'application/json'}, status);
  }
}