export interface SlackParams {
  type: string;
  challenge: string;
  command: string;
  response_url: string;
  text: string;
  user_id: string;
  user_name: string;
  token: string;
  channel_id: string;
  event: {
    text: string;
    channel: string;
    type: string;
    subtype: string;
    user: string;
    message: {
      type: string;
      text: string;
      team: string;
      user: string;
      user_team: string;
    }
  }
}