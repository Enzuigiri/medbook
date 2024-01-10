import { Db, MongoClient } from "mongodb";
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
import { CreateHospitalAccessRequest } from "./domain/use-cases/hospital/create_access_request";
import { HospitalRequestRepositoryImpl } from "./domain/repositories/hospital-request-repository";
import { MongoDBHospitalRequestDataSource } from "./data/data-sources/mongodb/mongodb-hopital-request-data-source";
import { GetAllRequest } from "./domain/use-cases/hospital/get_all_requests";

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
  const bcryptService = new BcryptService();
  var jwtService = new JwtService();
  const version = "api/v1";

  const userMiddleWare = UserRouter(
    new CreateUser(new UserRepositoryImpl(userDataSource), bcryptService),
    new GetAllUsers(new UserRepositoryImpl(userDataSource))
  );

  const authMiddleWare = AuthRouter(
    new LoginAuth(
      new UserRepositoryImpl(userDataSource),
      bcryptService,
      jwtService
    )
  );

  const hospitalMiddleWare = HospitalRequestRouter(
    new CreateHospitalAccessRequest(
      new HospitalRequestRepositoryImpl(hospitalDataSource)
    ),
    new GetAllRequest(new HospitalRequestRepositoryImpl(hospitalDataSource))
  );

  server.use(`/${version}/users`, userMiddleWare);
  server.use(`/${version}/auth`, authMiddleWare);
  server.use(`/${version}/hospital`, hospitalMiddleWare);
  server.listen(3000, () => console.log("Running on http://localhost:3000"));
})();
