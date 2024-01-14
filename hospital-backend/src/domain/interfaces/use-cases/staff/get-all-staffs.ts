import { Staff } from "../../../entities/staff.js";

export interface GetAllStafsUsecase {
  execute(): Promise<Staff[]>;
}
