import { HospitalRequestResponse } from "../../../entities/hospital-request";

export interface HospitalAccessResponseUseCase {
    execute(response: HospitalRequestResponse): Promise<boolean>
}