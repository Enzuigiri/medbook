import { Medication } from "../../../domain/entities/medication";
import { MedicationDataSource } from "../../interfaces/medication-data-source";
import { MongoDBWrapper } from "../../interfaces/mongo-db-wrapper";

export class MongoDBMedicationDataSource implements MedicationDataSource {
  private readonly mongoDB: MongoDBWrapper;
  constructor(mongoDB: MongoDBWrapper) {
    this.mongoDB = mongoDB;
  }

  async create(user_id: string, medication: Medication): Promise<boolean> {
    const result = await this.mongoDB.updateOne(
      { email: user_id },
      {
        $push: { "medical_record.medication": medication },
      }
    );
    return result !== null;
  }

  async update(user_id: string, medication: Medication): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async getAll(user_id: string): Promise<Medication[]> {
    throw new Error("Method not implemented.");
  }
}
