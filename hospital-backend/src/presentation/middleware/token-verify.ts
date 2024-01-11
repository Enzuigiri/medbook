import { NextFunction, Request, Response } from "express";
import { IJwtService } from "../../domain/interfaces/services/jwt-service";
import { ENV } from "../../env";
import { RequestError } from "../../utils/error/error-utils";
import { JwtService } from "../../domain/services/jwt-service";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers["authorization"];
    const header = authHeader && authHeader.split(" ")[0].toLocaleLowerCase();
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    const jwt = new JwtService();
    switch (header) {
      case "hospital": {
        verifyHospitalToken(req, token, jwt, ENV.HOSPITAL_TOKEN_SECRET);
        break;
      }
      case "read": {
        verifyAccessToken(req, token, jwt, ENV.READ_TOKEN_SECRET)
        break;
      }
      case "write": {
        verifyAccessToken(req, token, jwt, ENV.WRITE_TOKEN_SECRET)
        break;
      }
      default: {
        verifyUserToken(req, token, jwt, ENV.TOKEN_SECRET)
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
  token: string,
  jwtService: JwtService,
  secret: string
) {
  const result = jwtService.checkToken(token, secret);
  req.body.user_id = result.email;
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
  token: string,
  jwtService: JwtService,
  secret: string
) {
  const result = jwtService.checkToken(token, secret);
  req.body.user_id = result.user_id;
  req.body.req_id = result.req_id;
}

// export function verifyHospitalToken(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1];
//     if (token == null) return res.sendStatus(401);
//     const jwt = new JwtService();
//     const result = jwt.checkToken(token, ENV.HOSPITAL_TOKEN_SECRET);
//     req.body.hospital_name = result.hospital_name;
//     req.body.hospital_id = result.hospital_id;
//     req.body.staff_name = result.staff_name;
//     req.body.staff_id = result.staff_id;
//     next();
//   } catch (err) {
//     if (err instanceof RequestError) {
//       return res.status(err.getErrorCode()).send({ message: err.message });
//     }
//     res.status(500).send({ message: "Internal server error" });
//   }
// }

// export function verifyWriteToken(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1];
//     if (token == null) return res.sendStatus(401);
//     const jwt = new JwtService();
//     const result = jwt.checkToken(token, ENV.WRITE_TOKEN_SECRET);

//     req.body.user_id = result.user_id;
//     req.body.req_id = result.req_id;
//     next();
//   } catch (err) {
//     if (err instanceof RequestError) {
//       return res.status(err.getErrorCode()).send({ message: err.message });
//     }
//     res.status(500).send({ message: "Internal server error" });
//   }
// }

// export function verifyReadToken(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1];
//     if (token == null) return res.sendStatus(401);
//     const jwt = new JwtService();
//     const result = jwt.checkToken(token, ENV.READ_TOKEN_SECRET);
//     req.body.user_id = result.user_id;
//     req.body.req_id = result.req_id;
//     next();
//   } catch (err) {
//     if (err instanceof RequestError) {
//       return res.status(err.getErrorCode()).send({ message: err.message });
//     }
//     res.status(500).send({ message: "Internal server error" });
//   }
// }
