import { Staff } from "../../entities/staff";


export interface StaffRepository {
  createStaff(staff: Staff): Promise<boolean>;
  getStaffByEmail(email: string): Promise<Staff>;
  getAllStaffs(): Promise<Staff[]>;
  updateStaff(staff: Staff): Promise<boolean>;
}
