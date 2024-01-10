import { NextFunction, Request, Response } from "express";
import { IJwtService } from "../../domain/interfaces/services/jwt-service";
import { ENV } from "../../env";
import { RequestError } from "../../utils/error/error-utils";
import { JwtService } from "../../domain/services/jwt-service";

export function verifyUserToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    const jwt = new JwtService();
    const result = jwt.checkToken(token, ENV.TOKEN_SECRET);
    req.body.user_id = result.email;
    next();
  } catch (err) {
    if (err instanceof RequestError) {
      return res.status(err.getErrorCode()).send({ message: err.message });
    }
    res.status(500).send({ message: "Internal server error" });
  }
}

export function verifyHospitalToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    const jwt = new JwtService();
    const result = jwt.checkToken(token, ENV.HOSPITAL_TOKEN_SECRET);
    req.body.hospital_name = result.hospital_name;
    req.body.hospital_id = result.hospital_id;
    req.body.staff_name = result.staff_name;
    req.body.staff_id = result.staff_id;
    next();
  } catch (err) {
    if (err instanceof RequestError) {
      return res.status(err.getErrorCode()).send({ message: err.message });
    }
    res.status(500).send({ message: "Internal server error" });
  }
}
