import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { GetAllUsersUseCase } from "../../domain/interfaces/use-cases/user/get-all-users.js";
import { CreateUserUseCase } from "../../domain/interfaces/use-cases/user/create-user.js";
import { ErrorUtils, RequestError } from "../../utils/error/error-utils.js";

export default function UserRouter(
  createUserUseCase: CreateUserUseCase,
  getAllUsersUseCase: GetAllUsersUseCase
) {
  const router = express.Router();

  router.get( "/", async (req: Request, res: Response) => {
      try {
        const users = await getAllUsersUseCase.execute();
        res.send(users);
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
          await createUserUseCase.execute(req.body);
          res.status(201).send({ message: "Created" });
        }

        ErrorUtils.error.badRequestException({message: "Some data is missing or wrong value"})
      } catch (err) {
        if (err instanceof RequestError) {
          res.status(err.getErrorCode()).send({ message: err.message })
        } else {
          res.status(500).send({ message: "Error fetching data" });
        }
      }
    }
  );

  return router;
}
