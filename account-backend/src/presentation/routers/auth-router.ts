import { LoginUseCase } from "../../domain/interfaces/use-cases/auth/login-auth";
import express, { Request, Response, Router } from "express";
import { ErrorUtils, RequestError } from "../../utils/error/error-utils";
import { body, validationResult } from "express-validator";

export default function AuthRouter(loginUseCase: LoginUseCase): Router {
  const router = express.Router();

  router.post(
    "/",
    body("email").isEmail().notEmpty().escape(),
    body("password").isString().notEmpty().escape(),
    async (req: Request, res: Response) => {
      try {
        const exception = validationResult(req);

        if (exception.isEmpty()) {
          const response = await loginUseCase.execute(req.body);
          return res.status(200).send(response);
        }

        ErrorUtils.error.badRequestException({
          message: "Some data is missing or wrong value",
        });

      } catch (err) {
        if (err instanceof RequestError) {
          res.status(err.getErrorCode()).send({ message: err.message });
        } else {
          res.status(500).send({ message: "Error fetching data" });
        }
      }
    }
  );

  return router;
}
