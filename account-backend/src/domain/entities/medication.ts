export interface Medication {
  id?: string;
  req_id?: string;
  name: string;
  dose: string;
  frequency: string;
  created_date?: Date;
}
