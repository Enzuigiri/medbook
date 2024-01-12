import { MedicationAccess } from "../../../domain/entities/medication_access";
import { MedicationAccessDataSource } from "../../interfaces/medication-access-data-source";
import { MongoDBWrapper } from "../../interfaces/mongo-db-wrapper";

export class MongoDBMedicationAccessDataSource
  implements MedicationAccessDataSource
{
  private readonly database: MongoDBWrapper;
  constructor(database: MongoDBWrapper) {
    this.database = database;
  }

  async create(user_id: string, access: MedicationAccess): Promise<boolean> {
    const result = await this.database.updateOne(
      { _id: user_id },
      { $push: { medication_access: access } }
    );
    return result !== null;
  }

  async update(user_id: string, access: MedicationAccess): Promise<boolean> {
    const result = await this.database.updateOne(
      { _id: user_id, "medication_access.id": access.id },
      { $set: { "medication.$.request_access": access.request_status } }
    );
    return result;
  }

  async getAll(user_id: string): Promise<MedicationAccess[]> {
    const result = await this.database.findOne({_id: user_id})
    return result
  }
}
