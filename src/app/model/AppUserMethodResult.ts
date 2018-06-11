export class AppUserMethodResult {
  access_token: string;
  token_type: string;
  expires_in: number;

  constructor(token: string, type: string, expires: number) {
    this.access_token = token;
    this.token_type = type;
    this.expires_in = expires;
  }
}
