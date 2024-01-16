import { Staff } from "../../entities/staff";
import { User } from "../../entities/user";
import { StaffRepository } from "../../interfaces/repositories/staff-repository";
import { GetAllStafsUsecase } from "../../interfaces/use-cases/staff/get-all-staffs";

export class GetAllStaffs implements GetAllStafsUsecase {
  private readonly userRepository: StaffRepository;
  constructor(userRepository: StaffRepository) {
    this.userRepository = userRepository;
  }

  async execute(): Promise<Staff[]> {
    const result = await this.userRepository.getAllStaffs();
    return result;
  }
}
