import {
  type CreateRandomString
} from '@/usecases/create-random-base64-string-usecase'

export interface AddHashesUseCase {
  execute: () => Promise<void>
}

export interface HashStorageRepository {
  countHashes: () => Promise<number>
  addHash: (hash: string, inUse: boolean) => Promise<void>
}

export class AddHashesOnDbUseCase implements AddHashesUseCase {
  constructor (
    private readonly hashStorageRepository: HashStorageRepository,
    private readonly createRandomString: CreateRandomString
  ) {}

  execute = async (): Promise<void> => {
    const hashesCount = await this.hashStorageRepository.countHashes()
    if (hashesCount === 0) {
      const hashesCount = this.createRandomString.getHowManyHashesCount()
      for (let i = 0; i < hashesCount; i++) {
        const hash = this.createRandomString.execute()
        const inUse = false
        await this.hashStorageRepository.addHash(hash, inUse)
      }
    }
  }
}
