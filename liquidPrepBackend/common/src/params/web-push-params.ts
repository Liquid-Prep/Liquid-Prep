import { Params } from "../params";

export interface WebPushParams extends Params {
  domain: string;
  vapidPublicKey: string;
  vapidPrivateKey: string;
  partition: string;
  subscription: any;
  payload: any;
  ttl: any;
}