import express, { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { GetAllStafsUsecase } from "../../domain/interfaces/use-cases/staff/get-all-staffs.js";
import { SignUpStaffUseCase } from "../../domain/interfaces/use-cases/staff/sign-up-staff.js";
import { ErrorUtils, RequestError } from "../../utils/error/error-utils.js";
import { verifyToken } from "../middleware/verify-token.js";

export default function StaffRouter(
  signUpStaffUseCase: SignUpStaffUseCase,
  getAllStaffsUseCase: GetAllStafsUsecase
): Router {
  const router = express.Router();

  // For testing
  router.get(
    "/",
    verifyToken,
    body("user_id").isString().notEmpty().escape(),
    async (req: Request, res: Response) => {
      try {
        const exception = validationResult(req);
        if (exception.isEmpty()) {
          const users = await getAllStaffsUseCase.execute();
          return res.send(users);
        }
        ErrorUtils.error.badRequestException({
          message: "Token is hijacked",
        });
      } catch (err) {
        res.status(500).send({ message: "Error fetching data" });
      }
    }
  );

  router.post(
    "/",
    body("email").isEmail().notEmpty().escape(),
    body("password").isString().notEmpty().escape(),
    body("name").isString().notEmpty().escape(),
    async (req: Request, res: Response) => {
      try {
        const exception = validationResult(req);

        if (exception.isEmpty()) {
          await signUpStaffUseCase.execute(req.body);
          return res.status(201).send({ message: "Staff created" });
        }

        ErrorUtils.error.badRequestException({
          message: "Some data is missing or wrong value",
        });
      } catch (err) {
        if (err instanceof RequestError) {
          return res.status(err.getErrorCode()).send({ message: err.message });
        }
        res
          .status(500)
          .send({ message: "Error fetching data or email alredy exist" });
      }
    }
  );

  return router;
}
