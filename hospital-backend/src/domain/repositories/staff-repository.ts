import { StaffDataSource } from "../../data/interfaces/staff-data-source";
import { Staff } from "../entities/staff";
import { StaffRepository } from "../interfaces/repositories/staff-repository";

export class StaffRepositoryImpl implements StaffRepository {
  private readonly userDataSource: StaffDataSource;
  constructor(userDataSouce: StaffDataSource) {
    this.userDataSource = userDataSouce;
  }
  
  async createStaff(staff: Staff): Promise<boolean> {
    const result = await this.userDataSource.createStaff(staff);
    return result;
  }

  async getStaffByID(user_id: string): Promise<Staff> {
    const result = await this.userDataSource.getStaffByID(user_id);
    return result;
  }

  async getAllStaffs(): Promise<Staff[]> {
    const result = await this.userDataSource.getAll();
    return result;
  }

  async updateStaff(staff: Staff): Promise<boolean> {
    const result = await this.userDataSource.update(staff);
    return result;
  }
}
