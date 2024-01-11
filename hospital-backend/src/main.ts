import { MongoClient } from "mongodb";
import { MongoDBWrapper } from "./data/interfaces/mongo-db-wrapper";
import UserRouter from "./presentation/routers/user-router";
import { GetAllUsers } from "./domain/use-cases/user/get-all-users";
import { UserRepositoryImpl } from "./domain/repositories/user-repository";
import { MongoDBUserDataSource } from "./data/data-sources/mongodb/mongodb-user-data-source";
import { CreateUser } from "./domain/use-cases/user/create-user";
import server from "./server";
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

async function getMongoDB(): Promise<MongoDBWrapper> {
  const client: MongoClient = new MongoClient(
    "mongodb://root:Test12345!@localhost:27017/"
  );
  await client.connect();

  const db = client.db("account_db");

  const dbWrapper: MongoDBWrapper = {
    find: (query) => db.collection("users").find(query).toArray(),
    insertOne: (doc: any) => db.collection("users").insertOne(doc),
    findOne: (query) => db.collection("users").findOne(query),
    updateOne: (query, update) =>
      db.collection("users").updateOne(query, update),
  };

  return dbWrapper;
}

(async () => {
  const mongoClientDB = await getMongoDB();
  const userDataSource = new MongoDBUserDataSource(mongoClientDB);
  const hospitalDataSource = new MongoDBHospitalRequestDataSource(
    mongoClientDB
  );
  const medicationDataSource = new MongoDBMedicationDataSource(mongoClientDB)
  const bcryptService = new BcryptService();
  const jwtService = new JwtService();
  const version = "api/v1";

  const userRepo = new UserRepositoryImpl(userDataSource);
  const userMiddleWare = UserRouter(
    new CreateUser(userRepo, bcryptService),
    new GetAllUsers(userRepo)
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
  )

  server.use(`/${version}/users`, userMiddleWare);
  server.use(`/${version}/auth`, authMiddleWare);
  server.use(`/${version}/users/hospital`, hospitalMiddleWare);
  server.use(`/${version}/users/medication`, medicationMiddleWare);
  server.listen(3000, () => console.log("Running on http://localhost:3000"));
})();
