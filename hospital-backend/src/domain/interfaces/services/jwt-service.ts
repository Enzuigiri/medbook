export interface IJwtServicePayload {
  user_id: string;
}

export interface IJwtStaffRequestPayload {
  hospital_name: string;
  hospital_id: string;
  staff_id: string;
  staff_name: string;
}

export interface IJwtService {
  checkToken(token: string, secrets: string): Promise<any>;
  createToken(payload: object, secrets: string, expireIn: string): string;
}
