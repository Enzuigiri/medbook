import { ErrorUtils } from "../../utils/error/error-utils";
import {
  IJwtService,
  IJwtServicePayload,
} from "../interfaces/services/jwt-service";
import jwt from "jsonwebtoken";

export class JwtService implements IJwtService {
  async checkToken(token: string, secrets: string): Promise<any> {
    jwt.verify(token, secrets, (err: any, user: any) => {
      if (err) {
        ErrorUtils.error.unauthorizedException({
          message: "Token is expired didn't set",
        });
      }
      return user;
    });
  }

  createToken(
    payload: IJwtServicePayload,
    secrets: string,
    expireIn: string
  ): string {
    return jwt.sign(payload, secrets, { expiresIn: expireIn });
  }
}
