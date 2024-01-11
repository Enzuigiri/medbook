import { RequestAuth, ResponseAuth } from "../../../entities/auth";

export interface LoginUseCase {
    execute(data: RequestAuth): Promise<ResponseAuth>;
}