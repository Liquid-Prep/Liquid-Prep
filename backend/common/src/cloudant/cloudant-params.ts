import { Params } from "../params";

export interface CloudantParams extends Params {
  username: string;
  password: string;
  database: string;
}