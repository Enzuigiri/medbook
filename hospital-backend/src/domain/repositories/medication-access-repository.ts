import { AxiosUserDataSource } from "../../data/data-sources/httpclient/axios-user-data-source";
import { MedicationAccessDataSource } from "../../data/interfaces/medication-access-data-source";
import { UserDataSource } from "../../data/interfaces/user-data-source";
import { Medication } from "../entities/medication";
import { MedicationAccess } from "../entities/medication_access";
import { MedicationAccessRepository } from "../interfaces/repositories/medication-access-repository";
import { MedicationRepository } from "../interfaces/repositories/medication-repository";

export class MedicationAccessRepositoryImpl
  implements MedicationAccessRepository
{
  private readonly accessDataSource: MedicationAccessDataSource;
  private readonly userDataSource: UserDataSource;
  constructor(
    accessDataSource: MedicationAccessDataSource,
    userDataSource: UserDataSource
  ) {
    this.accessDataSource = accessDataSource;
    this.userDataSource = userDataSource;
  }

  async getAllPatientMedication(patient_id: string): Promise<Medication[]> {
    throw new Error("Method not implemented.");
  }

  async create(
    user_id: string,
    access: MedicationAccess,
    token: string
  ): Promise<boolean> {
    const result = await this.accessDataSource.create(user_id, access);
    var message = 500
    if (result) {
      message = await this.userDataSource.requestAccess(
        user_id,
        access.id,
        access.request_type,
        token
      );
    }
    return result && message === 200;
  }

  async update(user_id: string, access: MedicationAccess): Promise<boolean> {
    const result = await this.accessDataSource.update(user_id, access);
    return result;
  }

  async getAll(user_id: string): Promise<MedicationAccess[]> {
    const result = await this.accessDataSource.getAll(user_id);
    return result;
  }
}
