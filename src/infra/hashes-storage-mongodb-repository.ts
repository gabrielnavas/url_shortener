import type mongo from 'mongodb'

import { type HashStorageRepository } from '@/usecases/add-hashes-usecase'

export class HashesMongoDBRepository implements HashStorageRepository {
  private readonly _collectionName: string = 'hashes'

  get collectionName (): string {
    return this._collectionName
  }

  constructor (
    private readonly db: mongo.Db
  ) {}

  countHashes = async (): Promise<number> => {
    const hashesDb = this.db.collection(this._collectionName)
    return await hashesDb.countDocuments()
  }

  addHash = async (hash: string, inUse: boolean): Promise<void> => {
    const hashesDb = this.db.collection(this._collectionName)
    const doc = {
      hash,
      inUse
    }
    await hashesDb.insertOne(doc)
  }
}
