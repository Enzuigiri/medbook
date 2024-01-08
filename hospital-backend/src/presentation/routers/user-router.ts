import express, { Request, Response } from "express";
import { GetAllUsersUseCase } from "../../domain/interfaces/use-cases/user/get-all-users.js";
import { CreateUserUseCase } from "../../domain/interfaces/use-cases/user/create-user.js";

export default function UserRouter(
  createUserUseCase: CreateUserUseCase,
  getAllUsersUseCase: GetAllUsersUseCase
) {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const users = await getAllUsersUseCase.execute();
      res.send(users);
    } catch (err) {
      res.status(500).send({ message: "Error fetching data" });
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    try {
      await createUserUseCase.execute(req.body);
      res.status(201).send({ message: "Created" });
    } catch (err) {
      res.status(500).send({ message: "Error fetching data " });
    }
  });

  return router;
}
