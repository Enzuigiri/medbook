export interface MongoDBWrapper {
    find(query: object): Promise<any[]>
    inserOne(doc: any): Promise<any>
}