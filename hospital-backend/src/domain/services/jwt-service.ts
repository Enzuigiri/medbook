import { ENV } from "../../env";
import { ErrorUtils } from "../../utils/error/error-utils";
import {
  IJwtService,
  IJwtServicePayload,
} from "../interfaces/services/jwt-service";
import jwt from "jsonwebtoken";

export class JwtService implements IJwtService {
  checkToken(token: string, secrets: string): any {
    let result = jwt.verify(token, secrets, (err: any, user: any) => {
      if (err) {
        ErrorUtils.error.unauthorizedException({
          message: "Token is expired or didn't set or wrong",
        });
      }
      return user;
    });
    return result
  }

//   createToken(
//     payload: IJwtServicePayload,
//     secrets: string,
//     expireIn: string
//   ): string {
//     return jwt.sign(payload, secrets, { expiresIn: expireIn });
//   }

  createToken(
    payload: IJwtServicePayload,
    secrets: string,
    expireIn: string
  ): string {
    const object = {
        hospital_name: "RS Haji Bunda",
        hospital_id: "Ahdsahdi12313",
        staff_name: "Aji Kusuma",
        staff_id: "asdajidjjads123123"
    }
    return jwt.sign(object, ENV.HOSPITAL_TOKEN_SECRET);
  }
}
