import {
  CreateRandomBase64StringUsecase
} from '@/usecases/create-random-base64-string-usecase'

describe('Create Random Hash Class', () => {
  test('the hash must be a maximum of 7 characters', () => {
    const sut = new CreateRandomBase64StringUsecase()
    const hash = sut.execute()
    expect(typeof hash).toEqual('string')
    expect(hash.length).toEqual(8)
  })

  test('must not generate repeated hashes', () => {
    const sut = new CreateRandomBase64StringUsecase()

    const generateHashes = (howMany: number = 10): string[] => {
      const hashes: string[] = []
      while (howMany > 0) {
        const hash: string = sut.execute()
        hashes.push(hash)
        howMany--
      }
      return hashes
    }

    const verifyRepeatHash = (hashes: string[]): boolean => {
      let hashRepeatHashs = false
      while (!hashRepeatHashs && hashes.length > 1) {
        const hash = hashes.pop()
        const hashFind = hashes.find(hashi => hash === hashi)
        if (hashFind !== undefined) {
          hashRepeatHashs = true
        }
      }
      return hashRepeatHashs
    }

    const hashes = generateHashes(100)
    const hashRepeatHashs = verifyRepeatHash(hashes)

    expect(hashRepeatHashs).toEqual(false)
  })

  test('should return base64 size', () => {
    const sut = new CreateRandomBase64StringUsecase()
    const base64Length: number = 64
    expect(sut.getReferenceASCII().length).toEqual(base64Length)
  })
})
