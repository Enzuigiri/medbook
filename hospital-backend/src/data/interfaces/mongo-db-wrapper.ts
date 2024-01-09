export interface MongoDBWrapper {
    find(query: object): Promise<any[]>
    insertOne(doc: any): Promise<any>
}