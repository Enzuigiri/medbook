import { HospitalRequestResponse } from "../../../entities/hospital-request";

export interface HospitalAccessResponseUseCase {
    execute(respponse: HospitalRequestResponse): Promise<boolean>
}