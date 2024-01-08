import { User } from "../../domain/entities/user";

export interface UserDataSource {
    createUser(user: User): Promise<boolean>;
    getAll(): Promise<User[]>;
}