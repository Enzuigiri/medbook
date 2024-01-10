export interface MongoDBWrapper {
  find(query: object): Promise<any[]>;
  findOne(query: object): Promise<any>;
  insertOne(doc: any): Promise<any>;
  updateOne(query: object, update: object): Promise<any>;
}
