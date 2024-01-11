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

  async edit(user_id: string, medication: Medication): Promise<boolean> {
    const result = await this.mongoDB.updateOne(
      {
        email: user_id,
        "medical_record.medication.id": medication.id,
        "medical_record.medication.req_id": medication.req_id,
      },
      {
        $set: {
          "medical_record.medication.$.name": medication.name,
          "medical_record.medication.$.frequency": medication.frequency,
          "medical_record.medication.$.dose": medication.dose,
        },
      }
    );
    console.log(result);
    return result !== null && result.matchedCount > 0;
  }

  async getAll(user_id: string): Promise<Medication[]> {
    const result = await this.mongoDB.findOne({ email: user_id });
    return result.medical_record.medication.map((medication) => {
      id: medication.id;
      name: medication.name;
      frequency: medication.frequency;
    });
  }
}
