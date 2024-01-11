export interface IJwtServicePayload {
  email: string;
}

export interface IJwtService {
  checkToken(token: string, secrets: string): Promise<any>;
  createToken(
    payload: IJwtServicePayload,
    secrets: string,
    expireIn: string
  ): string;
}
