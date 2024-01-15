import { AxiosStatic } from "axios";
import { Medication } from "../../../domain/entities/medication";
import { UserDataSource } from "../../interfaces/user-data-source";
import { User } from "../../../domain/entities/user";
import { ErrorUtils } from "../../../utils/error/error-utils";

export class AxiosUserDataSource implements UserDataSource {
  private readonly axios: AxiosStatic;
  private readonly baseUrl: string;

  constructor(axios: AxiosStatic, baseUrl: string) {
    this.axios = axios;
    this.baseUrl = baseUrl;
  }

  updateMedication(patient_id: string, medication: Medication): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  requestAccess(
    patient_id: string,
    req_id: string,
    type: string,
    token: string
  ): Promise<number> {
    throw new Error("Method not implemented.");
  }

  getAllMedication(token: string): Promise<Medication[]> {
    throw new Error("Method not implemented.");
  }

  async getAllUser(token: string): Promise<User[]> {
    const { data, status } = await this.axios.get<User[]>(
      `${this.baseUrl}/users`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `hospital ${token}`,
        },
      }
    );

    if (status !== 200 && status !== 201) {
      ErrorUtils.error.internalServerErrorException({
        message: "Error trying to contact account server",
      });
    }

    JSON.stringify(data, null, 4);

    return data;
  }
}
