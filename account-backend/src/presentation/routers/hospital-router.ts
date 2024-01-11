import express, { Request, Response, Router } from "express";
import {
  verifyToken,
} from "../middleware/verify-token";
import { body, validationResult } from "express-validator";
import { ErrorUtils, RequestError } from "../../utils/error/error-utils";
import { GetAllRequestUseCase } from "../../domain/interfaces/use-cases/hospital/get-all-requests";
import { CreateHospitalAccessRequestUseCase } from "../../domain/interfaces/use-cases/hospital/create-access-request";
import { HospitalAccessResponseUseCase } from "../../domain/interfaces/use-cases/hospital/response-access-request";
import { JwtService } from "../../domain/services/jwt-service";

export default function HospitalRequestRouter(
  createAccessRequest: CreateHospitalAccessRequestUseCase,
  getAllRequest: GetAllRequestUseCase,
  responseAccessRequest: HospitalAccessResponseUseCase
): Router {
  const router = express.Router();
  router.post(
    "/",
    verifyToken,
    body("user_id").notEmpty().escape(),
    body("request_type").notEmpty().isString().escape(),
    async (req: Request, res: Response) => {
      try {
        const exception = validationResult(req);
        if (exception.isEmpty()) {
          await createAccessRequest.execute(req.body);
          return res.status(201).send({ message: "Request created" });
        }
        ErrorUtils.error.badRequestException({
          message: "Token is hijacked",
        });
      } catch (err) {
        if (err instanceof RequestError) {
          return res.status(err.getErrorCode()).send({ message: err.message });
        }
        res.status(500).send({ message: "Error fetching data" });
      }
    }
  );

  router.get(
    "/",
    verifyToken,
    body("user_id").notEmpty().escape(),
    async (req: Request, res: Response) => {
      try {
        const exception = validationResult(req);
        if (exception.isEmpty()) {
          const request = await getAllRequest.execute(req.body.user_id);
          return res.send(request);
        }
      } catch (err) {
        if (err instanceof RequestError) {
          return res.status(err.getErrorCode()).send({ message: err.message });
        }
        res.status(500).send({ message: "Error fetching data" });
      }
    }
  );

  //TODO: Add http client in use case to hospital server

  router.put(
    "/response",
    verifyToken,
    body("user_id").notEmpty().escape(),
    body("req_id").notEmpty().escape(),
    body("request_status").notEmpty().escape(),
    async (req: Request, res: Response) => {
      try {
        const exception = validationResult(req);
        if (exception.isEmpty()) {
          const result = await responseAccessRequest.execute(req.body);
          console.log(`tes ${result}`)
          // Todo token Logic
          var token = "Failed to create";
          if (result) {
            token = new JwtService().createToken(
              {
                user_id: req.body.user_id,
                req_id: req.body.req_id,
              },
              process.env.WRITE_TOKEN_SECRET,
              ""
            );
          }
          return res.status(result ? 200 : 400).send({ token: token });
        }
        ErrorUtils.error.badRequestException({
          message: "Some data is missing or wrong value",
        });
      } catch (err) {
        if (err instanceof RequestError) {
          return res.status(err.getErrorCode()).send({ message: err.message });
        }
        res.status(500).send({ message: "Error fetching data" });
      }
    }
  );

  return router;
}
