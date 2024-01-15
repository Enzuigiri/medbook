import { User } from "../../entities/user";

export interface UserRepository {
    getAllUser(token: string): Promise<User[]>
}