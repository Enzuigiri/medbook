export interface HospitalRequest {
  id: string;
  hospital: string;
  hospital_id: string;
  staff_name: string;
  staff_id: string;
  request_type: RequestType;
}

enum RequestType {
  read = "READ",
  write = "WRITE",
}
