import {
  AddHashesOnDbUseCase,
  type HashStorageRepository,
  type AddHashesUseCase
} from '@/usecases/add-hashes-usecase'
import { type CreateRandomString } from '@/usecases/create-random-base64-string-usecase'

class HashStorageRepositorySpy implements HashStorageRepository {
  public countHashesMock: number = 10

  countHashes = async (): Promise<number> => {
    return this.countHashesMock
  }

  addHash = async (hash: string, inUse: boolean): Promise<void> => {}
}

class CreateRandomStringSpy implements CreateRandomString {
  public hashMock: string = 'h@sh!#'
  public referenceASCII: string = 'abch@s!#'
  public stringLengthMock: number = 3

  execute = (): string => {
    return this.hashMock
  }

  getReferenceASCII = (): string => {
    return this.referenceASCII
  }

  getStringLength = (): number => {
    return this.stringLengthMock
  }

  getHowManyHashesCount = (): number => {
    const referenceASCIILength: number = this.referenceASCII.length
    return Math.pow(referenceASCIILength, this.stringLengthMock)
  }
}

interface Sut {
  sut: AddHashesUseCase
  hashStorageRepositorySpy: HashStorageRepositorySpy
  createRandomStringSpy: CreateRandomStringSpy
}

const makeSut = (): Sut => {
  const hashStorageRepositorySpy = new HashStorageRepositorySpy()
  const createRandomStringSpy = new CreateRandomStringSpy()
  const sut = new AddHashesOnDbUseCase(hashStorageRepositorySpy, createRandomStringSpy)
  return {
    sut,
    hashStorageRepositorySpy,
    createRandomStringSpy
  }
}

describe('Insert Hashes On Db Class', () => {
  test('should call repository hash counter', async () => {
    const { sut, hashStorageRepositorySpy } = makeSut()
    const spyOn = jest.spyOn(hashStorageRepositorySpy, 'countHashes')
    await sut.execute()
    expect(spyOn).toHaveBeenCalled()
  })

  test('should call Create Random String instance if count hashes if zero-length', async () => {
    const { sut, hashStorageRepositorySpy, createRandomStringSpy } = makeSut()
    hashStorageRepositorySpy.countHashesMock = 0
    const hashesCount = createRandomStringSpy.getHowManyHashesCount()
    const spyOn = jest.spyOn(createRandomStringSpy, 'execute')
    await sut.execute()
    expect(spyOn).toHaveBeenCalledTimes(hashesCount)
  })

  test('should call Create Random String instance if count hashes if zero-length', async () => {
    const { sut, hashStorageRepositorySpy, createRandomStringSpy } = makeSut()
    hashStorageRepositorySpy.countHashesMock = 0
    const hashesCount = createRandomStringSpy.getHowManyHashesCount()
    const spyOn = jest.spyOn(hashStorageRepositorySpy, 'addHash')
    await sut.execute()
    expect(spyOn).toHaveBeenCalledTimes(hashesCount)
  })
})
