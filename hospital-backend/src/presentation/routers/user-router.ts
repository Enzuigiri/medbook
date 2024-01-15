import { verify } from "crypto";
import { GetAllUserUseCase } from "../../domain/interfaces/use-cases/user/get-all-user";
import express, { Response, Request, Router } from "express";
import { verifyToken } from "../middleware/verify-token";
import { body, validationResult } from "express-validator";
import { ErrorUtils, RequestError } from "../../utils/error/error-utils";

export default function UserRouter(
  getAllUserUseCase: GetAllUserUseCase
): Router {
  const router = express.Router();

  router.get(
    "/",
    verifyToken,
    body("staff_id").isString().notEmpty().escape(),
    async (req: Request, res: Response) => {
      try {
        const exception = validationResult(req);
        if (exception.isEmpty()) {
          const staffs = await getAllUserUseCase.execute(req.body.staff_id);
          return res.send(staffs);
        }
        ErrorUtils.error.badRequestException({
          message: "Token is hijacked",
        });
      } catch (err) {
        if (err instanceof RequestError) {
          res.status(err.getErrorCode()).send({ message: err.message });
        } else {
          res.status(500).send({ message: err });
        }
      }
    }
  );

  return router;
}
