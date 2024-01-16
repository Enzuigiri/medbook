import { Staff } from "../../entities/staff";

export interface StaffRepository {
  createStaff(staff: Staff): Promise<boolean>;
  getStaffByID(staff_id: string): Promise<Staff>;
  getAllStaffs(): Promise<Staff[]>;
  updateStaff(staff: Staff): Promise<boolean>;
}
