export interface MedicationAccess {
    id: string;
    patient_id: string;
    request_type: RequestType;
    request_status: RequestStatus;
    req_token: string;
    created_at: Date;
}

export interface MedicationAccessRequest {
    user_id: string;
    hospital_id: string;
    user_name: string;
    hospital_name: string
    patient_id: string;
    request_type: RequestType;
}

export enum RequestType {
    read = "READ",
    write = "WRITE",
  }

  export enum RequestStatus {
    reject = "REJECT",
    accept = "ACCEPT",
    pending = "PENDING",
  }