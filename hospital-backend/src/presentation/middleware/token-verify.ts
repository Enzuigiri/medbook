import { NextFunction, Request, Response } from "express";
import { IJwtService } from "../../domain/interfaces/services/jwt-service";
import { ENV } from "../../env";
import { RequestError } from "../../utils/error/error-utils";
import { JwtService } from "../../domain/services/jwt-service";

export default function verifyUserToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    const jwt = new JwtService();
    jwt.checkToken(token, ENV.TOKEN_SECRET);
    next();
  } catch (err) {
    if (err instanceof RequestError) {
      return res.status(err.getErrorCode()).send({ message: err.message });
    }
    res.status(500).send({ message: "Internal server error" });
  }
}
