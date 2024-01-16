import {
  HospitalRequest,
  HospitalRequestResponse,
} from "../../../domain/entities/hospital-request";
import { ErrorUtils } from "../../../utils/error/error-utils";
import { HospitalRequestDataSource } from "../../interfaces/hospital-request-data-source";
import { MongoDBWrapper } from "../../interfaces/mongo-db-wrapper";

export class MongoDBHospitalRequestDataSource
  implements HospitalRequestDataSource
{
  private readonly database: MongoDBWrapper;
  constructor(database: MongoDBWrapper) {
    this.database = database;
  }

  async create(
    hospital_request: HospitalRequest,
    user_id: string
  ): Promise<boolean> {
    const result = await this.database.updateOne(
      { email: user_id },
      { $push: { hospital_request: hospital_request } }
    );
    if (result === null) {
      ErrorUtils.error.internalServerErrorException({
        message: "Error fetching data",
      });
    }
    return result !== null;
  }

  async getRequests(user_id: string): Promise<HospitalRequest[]> {
    const result = await this.database.findOne({ email: user_id });
    return result.hospital_request.map((item: HospitalRequest) => ({
      id: item.id,
      hospital_name: item.hospital_name,
      hospital_id: item.hospital_id,
      staff_name: item.staff_name,
      staff_id: item.staff_id,
      request_type: item.request_type,
      request_status: item.request_status,
      date: item.date,
    }));
  }

  async updateResponseStatus(
    hospital_response: HospitalRequestResponse
  ): Promise<boolean> {
    const result = await this.database.updateOne(
      {
        email: hospital_response.user_id,
        "hospital_request.id": hospital_response.req_id,
      },
      {
        $set: {
          "hospital_request.$.request_status": hospital_response.request_status,
        },
      }
    );
    console.log(hospital_response)
    console.log(result)
    return result !== null;
  }
}
