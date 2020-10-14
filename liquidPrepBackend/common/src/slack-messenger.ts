import { Params } from './params';

export class SlackResponseMessage {
  constructor (
    public blocks: any,
    public headers: object) {
  }
}

export class SlackMessenger {

  constructor (private params: Params) {
  }

  send(body: any, statusCode: number = 200, headers = {'Content-Type': 'application/json'}): SlackResponseMessage {
    return new SlackResponseMessage(body, headers);
  }
}