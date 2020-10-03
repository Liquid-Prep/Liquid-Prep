import { Params } from './params';

export class WebPushResponseMessage {
  constructor (
    public body: any, 
    public headers: Object, 
    public statusCode: number = 200) {
  }
}

export class WebPushMessenger {

  constructor (private params: Params) {
  }

  send(body: any, statusCode: number = 200, headers = {'Content-Type': 'application/json'}): WebPushResponseMessage {
    return new WebPushResponseMessage(body, headers);
  }

  error(msg: any, status: number) {
    return new WebPushResponseMessage(msg, {'Content-Type': 'application/json'}, status);
  }
}