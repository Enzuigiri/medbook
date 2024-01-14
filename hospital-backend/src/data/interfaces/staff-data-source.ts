import { Staff } from "../../domain/entities/staff";

export interface StaffDataSource {
  createStaff(staff: Staff): Promise<boolean>;
  getAll(): Promise<Staff[]>;
  getStaffByEmail(email: string): Promise<Staff>;
  update(staff: Staff): Promise<boolean>;
}
