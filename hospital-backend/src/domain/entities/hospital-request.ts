export interface HospitalRequest {
  user_id: string;
  id?: string;
  hospital_name: string;
  hospital_id: string;
  staff_name: string;
  staff_id: string;
  date?: Date;
  request_type: RequestType;
  request_status: RequestStatus;
}

export interface HospitalRequestResponse {
  user_id: string;
  req_id: string;
  request_status: RequestStatus;
}

export interface HospitalAcceptRequest {
  user_id: string;
  name: string;
  email: string;
  token: string;
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
