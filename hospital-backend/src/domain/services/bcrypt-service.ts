import * as bcrypt from "bcrypt";
import { IBcryptService } from "../interfaces/services/bcrypt-service";

export class BcryptService implements IBcryptService {
  rounds: number = 10;

  async hash(hashString: string): Promise<string> {
    return await bcrypt.hash(hashString, this.rounds);
  }

  async compare(string: string, hashString: string): Promise<boolean> {
    return await bcrypt.compare(string, hashString);
  }
}
