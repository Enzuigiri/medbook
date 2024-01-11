import { CreateMedicationUseCase } from "../../domain/interfaces/use-cases/medical/create-medication";
import { EditMedicationUseCase } from "../../domain/interfaces/use-cases/medical/edit-medication";
import { GetAllMedicationsUseCase } from "../../domain/interfaces/use-cases/medical/get-all-medications";
import express, { Router, Request, Response } from "express";
import { verifyToken } from "../middleware/verify-token";
import { body, validationResult } from "express-validator";
import { ErrorUtils, RequestError } from "../../utils/error/error-utils";

export default function MedicationRouter(
  createMedication: CreateMedicationUseCase,
  editMedication: EditMedicationUseCase,
  getAllMedication: GetAllMedicationsUseCase
): Router {
  const router = express.Router();

  router.post(
    "/",
    verifyToken,
    body("user_id").isString().notEmpty().escape(),
    body("req_id").isString().notEmpty().escape(),
    body("name").isString().notEmpty().escape(),
    body("dose").isString().notEmpty().escape(),
    body("frequency").isString().notEmpty().escape(),
    async (req: Request, res: Response) => {
      try {
        const exception = validationResult(req);
        if (exception.isEmpty()) {
          await createMedication.execute(req.body.user_id, req.body);
          return res.status(201).send({ message: "Medication created" });
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

  router.get(
    "/",
    verifyToken,
    body("user_id").isString().notEmpty().escape(),
    body("req_id").isString().notEmpty().escape(),
    async (req: Request, res: Response) => {
      try {
        const exception = validationResult(req);
        if (exception.isEmpty()) {
          const result = await getAllMedication.execute(req.body.user_id);
          return res.status(200).send(result);
        }
        ErrorUtils.error.badRequestException({
          message: "Bad Token",
        });
      } catch (err) {
        if (err instanceof RequestError) {
          return res.status(err.getErrorCode()).send({ message: err.message });
        }
        res.status(500).send({ message: "Error fetching data" });
      }
    }
  );

  router.put(
    "/",
    verifyToken,
    body("user_id").isString().notEmpty().escape(),
    body("req_id").isString().notEmpty().escape(),
    body("id").isString().notEmpty().escape(),
    body("name").isString().notEmpty().escape(),
    body("dose").isString().notEmpty().escape(),
    body("frequency").isString().notEmpty().escape(),
    async (req: Request, res: Response) => {
      try {
        console.log(req.body);
        const exception = validationResult(req);
        if (exception.isEmpty()) {
          const result = await editMedication.execute(
            req.body.user_id,
            req.body
          );
          return res
            .status(result ? 200 : 404)
            .send({
              message: result
                ? "Success"
                : "Failed data not found or not authorized",
            });
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
