import { MongoClient } from "mongodb";
import { MongoDBWrapper } from "./data/interfaces/mongo-db-wrapper";
import UserRouter from "./presentation/routers/user-router";
import { GetAllUsers } from "./domain/use-cases/user/get-all-users";
import { UserRepositoryImpl } from "./domain/repositories/user-repository";
import { MonngoDBUserDataSource } from "./data/data-sources/mongodb/mongodb-user-data-source";
import { CreateUser } from "./domain/use-cases/user/create-user";
import server from "./server";
import AuthRouter from "./presentation/routers/auth-router";
import { LoginAuth } from "./domain/use-cases/auth/login-auth";
import { BcryptService } from "./domain/services/bcrypt-service";
import { JwtService } from "./domain/services/jwt-service";

async function getMongoDS() {
  const client: MongoClient = new MongoClient(
    "mongodb://root:Test12345!@localhost:27017/"
  );
  await client.connect();
  const db = client.db("account_db");

  const contactDatabase: MongoDBWrapper = {
    find: (query) => db.collection("users").find(query).toArray(),
    insertOne: (doc: any) => db.collection("users").insertOne(doc),
    findOne: (query) => db.collection("users").findOne(query),
    update: (query, doc) =>
      db.collection("users").updateOne(query, { $set: doc }),
  };

  return new MonngoDBUserDataSource(contactDatabase);
}

(async () => {
  const dataSource = await getMongoDS();
  const bcryptService = new BcryptService();
  var jwtService = new JwtService();
  const version = "api/v1";

  const userMiddleWare = UserRouter(
    new CreateUser(new UserRepositoryImpl(dataSource), bcryptService),
    new GetAllUsers(new UserRepositoryImpl(dataSource))
  );

  const authMiddleWare = AuthRouter(
    new LoginAuth(new UserRepositoryImpl(dataSource), bcryptService, jwtService)
  );

  server.use(`/${version}/users`, userMiddleWare);
  server.use(`/${version}/auth`, authMiddleWare);
  server.listen(3000, () => console.log("Running on http://localhost:3000"));
})();
