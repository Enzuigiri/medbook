import { Staff } from "../../../entities/staff";

export interface SignUpStaffUseCase {
  execute(staff: Staff): Promise<Boolean>;
}
