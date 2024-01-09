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
  };

  return new MonngoDBUserDataSource(contactDatabase);
}

(async () => {
  const dataSource = await getMongoDS();
  const version = "api/v1";

  const userMiddleWare = UserRouter(
    new CreateUser(new UserRepositoryImpl(dataSource)),
    new GetAllUsers(new UserRepositoryImpl(dataSource))
  );

  const authMiddleWare = AuthRouter(
    new LoginAuth(new UserRepositoryImpl(dataSource))
  );

  server.use(`/${version}/user`, userMiddleWare);
  server.use(`/${version}/auth`, authMiddleWare);
  server.listen(3000, () => console.log("Running on http://localhost:3000"));
})();
