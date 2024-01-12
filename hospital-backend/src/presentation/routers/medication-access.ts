import { CreateMedicationAccessUseCase } from "../../domain/interfaces/use-cases/access/medication/create-medication-access";
import { GetAllMedicationAccessUseCase } from "../../domain/interfaces/use-cases/access/medication/get-all-medication-access";
import { UpdateMedicationAccessUseCase } from "../../domain/interfaces/use-cases/access/medication/update-medication-access";
import express, { Request, Response } from "express";
import { verifyToken } from "../middleware/verify-token";
import { body } from "express-validator";

export default function MedicationAccessRouter(
  createAccess: CreateMedicationAccessUseCase,
  updateAccess: UpdateMedicationAccessUseCase,
  getAllAccess: GetAllMedicationAccessUseCase
) {
  const router = express.Router();

  router.post(
    "/",
    verifyToken,
    body("user_id").isString().notEmpty().escape(),
    body("request_type").isString().notEmpty().escape(),
    body("hospital")
    async (req: Request, res: Response) => {
      try {
        const user_id = req.body.user_id;
        delete req.body.user_id;
        const result = await createAccess.execute(
          user_id,
          req.body,
          res.locals.token
        );
      } catch (err) {}
    }
  );

  return router;
}
