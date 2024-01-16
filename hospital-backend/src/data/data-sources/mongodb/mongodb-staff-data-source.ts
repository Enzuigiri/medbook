import { ObjectId } from "mongodb";
import { Staff } from "../../../domain/entities/staff";
import { MongoDBWrapper } from "../../interfaces/mongo-db-wrapper";
import { StaffDataSource } from "../../interfaces/staff-data-source";

export class MongoDBStaffDataSource implements StaffDataSource {
  private readonly database: MongoDBWrapper;

  constructor(database: MongoDBWrapper) {
    this.database = database;
  }

  async createStaff(staff: Staff): Promise<boolean> {
    const result = await this.database.insertOne(staff);
    return result !== null;
  }

  async getAll(): Promise<Staff[]> {
    const result = await this.database.find({});
    return result.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      email: item.email,
    }));
  }

  async getStaffByID(staff_id: string): Promise<Staff> {
    var object_id = ObjectId.createFromHexString(staff_id)
    const result = await this.database.findOne({ $or: [{ _id: object_id }, { email: staff_id}]});
    return result;
  }

  async update(staff: Staff): Promise<boolean> {
    const result = await this.database.updateOne(
      { email: staff.email },
      { $set: staff }
    );
    return result !== null;
  }
}
