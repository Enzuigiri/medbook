import server from "./server";
import { MongoClient } from "mongodb";
import { MongoDBWrapper } from "./data/interfaces/mongo-db-wrapper";

import StaffRouter from "./presentation/routers/staff-router";
import { GetAllStaffs } from "./domain/use-cases/staff/get-all-staffs";
import { StaffRepositoryImpl } from "./domain/repositories/staff-repository";
import { MongoDBStaffDataSource } from "./data/data-sources/mongodb/mongodb-staff-data-source";
import { SignUpStaff } from "./domain/use-cases/staff/sign-up-staff";

import AuthRouter from "./presentation/routers/auth-router";
import { LoginAuth } from "./domain/use-cases/auth/login-auth";
import { BcryptService } from "./domain/services/bcrypt-service";
import { JwtService } from "./domain/services/jwt-service";

import HospitalRequestRouter from "./presentation/routers/hospital-router";
import { CreateHospitalAccessRequest } from "./domain/use-cases/hospital/create-access-request";
import { HospitalRequestRepositoryImpl } from "./domain/repositories/hospital-request-repository";
import { MongoDBHospitalRequestDataSource } from "./data/data-sources/mongodb/mongodb-hopital-request-data-source";
import { GetAllRequest } from "./domain/use-cases/hospital/get-all-requests";
import { HospitalAccessResponse } from "./domain/use-cases/hospital/response-access-request";
import { MongoDBMedicationDataSource } from "./data/data-sources/mongodb/mongodb-medication-data-source";
import { MedicationRepositoryImpl } from "./domain/repositories/medication-repository";

import MedicationRouter from "./presentation/routers/medication-router";
import { CreateMedication } from "./domain/use-cases/medical/create-medication";
import { EditMedication } from "./domain/use-cases/medical/edit-medication";
import { GetAllMedication } from "./domain/use-cases/medical/get-all-medications";
import "dotenv/config";

async function getMongoDB(): Promise<MongoDBWrapper> {
  const client: MongoClient = new MongoClient(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_SERVER}:${process.env.DB_PORT}/`
  );
  await client.connect();

  const db = client.db(process.env.DB_NAME);
  const collectionName = "staffs"

  const dbWrapper: MongoDBWrapper = {
    find: (query) => db.collection(collectionName).find(query).toArray(),
    insertOne: (doc: any) => db.collection(collectionName).insertOne(doc),
    findOne: (query) => db.collection(collectionName).findOne(query),
    updateOne: (query, update) =>
      db.collection(collectionName).updateOne(query, update),
  };

  return dbWrapper;
}

(async () => {
  const mongoClientDB = await getMongoDB();
  const userDataSource = new MongoDBStaffDataSource(mongoClientDB);
  const hospitalDataSource = new MongoDBHospitalRequestDataSource(
    mongoClientDB
  );
  const medicationDataSource = new MongoDBMedicationDataSource(mongoClientDB);
  const bcryptService = new BcryptService();
  const jwtService = new JwtService();
  const version = "api/v1";

  const userRepo = new StaffRepositoryImpl(userDataSource);
  const userMiddleWare = StaffRouter(
    new SignUpStaff(userRepo, bcryptService),
    new GetAllStaffs(userRepo)
  );

  const authMiddleWare = AuthRouter(
    new LoginAuth(userRepo, bcryptService, jwtService)
  );

  const hospitalRepo = new HospitalRequestRepositoryImpl(hospitalDataSource);
  const hospitalMiddleWare = HospitalRequestRouter(
    new CreateHospitalAccessRequest(hospitalRepo),
    new GetAllRequest(hospitalRepo),
    new HospitalAccessResponse(hospitalRepo)
  );

  const medicationRepo = new MedicationRepositoryImpl(medicationDataSource);
  const medicationMiddleWare = MedicationRouter(
    new CreateMedication(medicationRepo),
    new EditMedication(medicationRepo),
    new GetAllMedication(medicationRepo)
  );

  server.use(`/${version}/staffs`, userMiddleWare);
  server.use(`/${version}/auth`, authMiddleWare);
  server.use(`/${version}/users/hospital`, hospitalMiddleWare);
  server.use(`/${version}/users/medication`, medicationMiddleWare);
  server.listen(process.env.SERVER_PORT, () => console.log(`Running on http://localhost:${process.env.SERVER_PORT}`));
})();
