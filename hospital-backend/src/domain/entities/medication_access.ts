export interface MedicationAccess {
    patient_id: string;
    request_type: RequestType;
    request_status: RequestStatus;
    req_id: string;
    req_token: string;
    created_at: Date;
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