import { Params } from "./params";

export interface ApiParams extends Params {
  days: string;
  language: string;
  units: string;
  basin: string;
  triggerFields: any;
  trigger_identity: string;
  user: any;
}