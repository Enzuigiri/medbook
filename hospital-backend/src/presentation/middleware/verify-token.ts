import { NextFunction, Request, Response } from "express";
import { RequestError } from "../../utils/error/error-utils";
import { JwtService } from "../../domain/services/jwt-service";

// Need to fix req.body
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers["authorization"];
    const header = authHeader && authHeader.split(" ")[0].toLocaleLowerCase();
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    const jwt = new JwtService();
    switch (header) {
      case "hospital": {
        verifyHospitalToken(req, token, jwt, process.env.HOSPITAL_TOKEN_SECRET);
        break;
      }
      case "read": {
        verifyAccessToken(req, res, token, jwt, process.env.READ_TOKEN_SECRET)
        break;
      }
      case "write": {
        verifyAccessToken(req, res, token, jwt, process.env.WRITE_TOKEN_SECRET)
        break;
      }
      default: {
        verifyUserToken(req, res, token, jwt, process.env.TOKEN_SECRET)
      }
    }
    next();
  } catch (err) {
    if (err instanceof RequestError) {
      return res.status(err.getErrorCode()).send({ message: err.message });
    }
    res.status(500).send({ message: "Internal server error" });
  }
}

function verifyUserToken(
  req: Request,
  res: Response,
  token: string,
  jwtService: JwtService,
  secret: string
) {
  const result = jwtService.checkToken(token, secret);
  req.body.user_id = result.user_id;
  res.locals.access = true;
}

function verifyHospitalToken(
  req: Request,
  token: string,
  jwtService: JwtService,
  secret: string
) {
  const result = jwtService.checkToken(token, secret);
  req.body.hospital_name = result.hospital_name;
  req.body.hospital_id = result.hospital_id;
  req.body.staff_name = result.staff_name;
  req.body.staff_id = result.staff_id;
}

function verifyAccessToken(
  req: Request,
  res: Response,
  token: string,
  jwtService: JwtService,
  secret: string
) {
  const result = jwtService.checkToken(token, secret);
  req.body.user_id = result.user_id;
  req.body.req_id = result.req_id;
  res.locals.access = true;
}