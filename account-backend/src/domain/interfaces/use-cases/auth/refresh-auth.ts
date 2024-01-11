import { ResponseAuth } from "../../../entities/auth";

export  interface RefreshTokenUseCase {
    execute(token: string): Promise<ResponseAuth>;
}