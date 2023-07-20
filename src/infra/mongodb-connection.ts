import { MongoClient, type Db } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI !== undefined
  ? process.env.MONGODB_URI
  : 'mongodb://root:pass123@localhost:27017'

export const makeConnectionMongoDB = (): { mongoClient: MongoClient, db: Db } => {
  const mongoClient = new MongoClient(MONGODB_URI)
  const db = mongoClient.db('url-shortener')
  return { mongoClient, db }
}
