export interface IJwtServicePayload {
  user_id: string;
}

export interface IJwtService {
  checkToken(token: string, secrets: string): Promise<any>;
  createToken(
    payload: IJwtServicePayload,
    secrets: string,
    expireIn: string
  ): string;
}
