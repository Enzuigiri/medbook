export interface IJwtServicePayload {
  user_id: string;
}

export interface IJwtService {
  checkToken(token: string, secrets: string): Promise<any>;
  createToken(
    payload: object,
    secrets: string,
    expireIn: string
  ): string;
}
