import { ObjectId } from "mongodb";
import { Medication } from "../../../domain/entities/medication";
import { MedicationDataSource } from "../../interfaces/medication-data-source";
import { MongoDBWrapper } from "../../interfaces/mongo-db-wrapper";

export class MongoDBMedicationDataSource implements MedicationDataSource {
  private readonly mongoDB: MongoDBWrapper;
  constructor(mongoDB: MongoDBWrapper) {
    this.mongoDB = mongoDB;
  }

  async create(user_id: string, medication: Medication): Promise<boolean> {
    var objectId = ObjectId.createFromHexString(user_id);
    const result = await this.mongoDB.updateOne(
      { _id: objectId },
      {
        $push: { "medical_record.medication": medication },
      }
    );
    return result !== null;
  }

  async edit(user_id: string, medication: Medication): Promise<boolean> {
    var objectId = ObjectId.createFromHexString(user_id);
    const result = await this.mongoDB.updateOne(
      {
        _id: objectId,
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
    var objectId = ObjectId.createFromHexString(user_id);
    const result = await this.mongoDB.findOne({ _id: objectId });
    return result.medical_record.medication.map((medication: Medication) => ({
      id: medication.id,
      name: medication.name,
      dose: medication.dose,
      frequency: medication.frequency,
      req_id: medication.req_id,
      created_date: medication.created_date,
    }));
  }
}
