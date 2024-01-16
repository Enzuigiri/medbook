import { Staff } from "../../domain/entities/staff";

export interface StaffDataSource {
  createStaff(staff: Staff): Promise<boolean>;
  getAll(): Promise<Staff[]>;
  getStaffByID(staff_id: string): Promise<Staff>;
  update(staff: Staff): Promise<boolean>;
}
