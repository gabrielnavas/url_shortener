import {
  HashesMongoDBRepository
} from '@/infra/hashes-storage-mongodb-repository'
import { makeConnectionMongoDB } from '@/infra/mongodb-connection'

describe('Hashes mongodb repository', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mongoClient, db } = makeConnectionMongoDB()

  const sut = new HashesMongoDBRepository(db)

  beforeAll(async () => {
    await db.collection(sut.collectionName).deleteMany()
  })

  afterAll(async () => {
    await mongoClient.close()
  })

  test('add hash', async () => {
    const promise = sut.addHash('h@ash#!123', false)
    await expect(promise).resolves.toBe(undefined)
  })

  test('count hashes', async () => {
    const count = await sut.countHashes()
    expect(count).toEqual(1)
  })
})
