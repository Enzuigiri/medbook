import { MongoClient } from "mongodb"
import { MongoDBWrapper } from "./data/interfaces/mongo-db-wrapper"
import UserRouter from "./presentation/routers/user-router"
import { GetAllUsers } from "./domain/use-cases/user/get-all-users"
import { UserRepositoryImpl } from "./domain/repositories/user-repository"
import { MonngoDBUserDataSource } from "./data/data-sources/mongodb/mongodb-user-data-source"
import { CreateUser } from "./domain/use-cases/user/create-user"
import server from "./server"

(async () => {
    const client: MongoClient = new MongoClient("mongodb://localhost:27017/")
    await client.connect()
    const db = client.db("ACCOUNT_DB")

    const userDB: MongoDBWrapper = {
        find: (query: any) => db.collection("users").find(query).toArray(),
        inserOne: (doc: any) => db.collection("users").insertOne(doc)
    }

    const userMiddleWare = UserRouter(
        new CreateUser(new UserRepositoryImpl(new MonngoDBUserDataSource(userDB))),
        new GetAllUsers(new UserRepositoryImpl(new MonngoDBUserDataSource(userDB)))
    )

    server.use("/user", userMiddleWare);
    server.listen(4000, () => console.log("Running on server"))
})