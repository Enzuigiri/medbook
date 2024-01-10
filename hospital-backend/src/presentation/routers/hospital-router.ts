import express, { Request, Response } from "express";
import {
  verifyHospitalToken,
  verifyUserToken,
} from "../middleware/token-verify";
import { body, validationResult } from "express-validator";
import { ErrorUtils, RequestError } from "../../utils/error/error-utils";
import { GetAllRequestUseCase } from "../../domain/interfaces/use-cases/hospital/get_all_requests";
import { CreateHospitalAccessRequestUseCase } from "../../domain/interfaces/use-cases/hospital/create_access_request";

export default function HospitalRequestRouter(
  create_access_request: CreateHospitalAccessRequestUseCase,
  get_all_request: GetAllRequestUseCase
) {
  const router = express.Router();

  router.post(
    "/",
    verifyHospitalToken,
    body("user_id").notEmpty().escape(),
    body("request_type").notEmpty().isString().escape(),
    async (req: Request, res: Response) => {
      try {
        const exception = validationResult(req);
        if (exception.isEmpty()) {
          const users = await create_access_request.execute(req.body);
          return res.send(users);
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
    verifyUserToken,
    body("email").notEmpty().escape(),
    async (req: Request, res: Response) => {
      try {
        const exception = validationResult(req);
        if (exception.isEmpty()) {
          const request = await get_all_request.execute(req.body.email);
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

  return router;
}
