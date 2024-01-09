import { User } from "../../../domain/entities/user";
import { MongoDBWrapper } from "../../interfaces/mongo-db-wrapper";
import { UserDataSource } from "../../interfaces/user-data-source";

export class MonngoDBUserDataSource implements UserDataSource {

    private readonly database: MongoDBWrapper;

    constructor(database: MongoDBWrapper) {
        this.database = database
    }

    async createUser(user: User): Promise<boolean> {
        const result = await this.database.insertOne(user)
        return result !== null
    }

    async getAll(): Promise<User[]> {
        const result = await this.database.find({})
        return result.map( item => ({
            id: item._id.toString(),
            name: item.name,
            email: item.email,
        }))
    }

}