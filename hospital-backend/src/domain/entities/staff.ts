import { ObjectId } from "mongodb";

export interface Staff {
    _id?: ObjectId;
    name: string;
    email: string;
    password?: string;
    created_at?: Date;
    last_login?: Date;
    refrest_token?: string;
  }