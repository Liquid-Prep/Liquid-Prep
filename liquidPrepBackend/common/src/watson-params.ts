import { Params } from './params';
import { ApiParams } from './api-params';
import { SlackParams } from './slack-params';

export interface WatsonParams extends Params, ApiParams, SlackParams {
  speechToTextUsername: string;
  speechToTextPassword: string;
  speechToTextIamApikey: string;
  speechToTextUrl: string;
  textToSpeechUsername: string;
  textToSpeechPassword: string;
  textToSpeechIamApikey: string;
  textToSpeechUrl: string;
  wuSlackBotToken: string;
  wusoSlackBotToken: string;
}