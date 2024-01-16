import { User } from "../../../entities/user";

export interface GetAllUserUseCase {
    execute(token: string): Promise<User[]>
}