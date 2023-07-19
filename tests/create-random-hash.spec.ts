import { CreateRandomHash } from "@/create-random-hash"

describe('Create Random Hash Class', () => {
  test('the hash must be a maximum of 7 characters', () => {
    const sut = new CreateRandomHash()
    const hash = sut.execute()
    expect(typeof hash).toEqual('string')
    expect(hash.length).toEqual(8)
  })

  test('must not generate repeated hashes', () => {
    const sut = new CreateRandomHash()

    const generateHashes = (howMany: number = 10): string[] => {
      const hashes = []
      while(howMany > 0) {
        const hash = sut.execute()
        hashes.push(hash)
        howMany--
      }
      return hashes
    }

    const verifyRepeatHash = (hashes: string[]): boolean => {
      let hashRepeatHashs = false
      while(hashRepeatHashs === false && hashes.length > 1) {
        const hash = hashes.pop()
        const hashFind = hashes.find(hashi => hash === hashi)
        if(hashFind !== undefined) {
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
    const sut = new CreateRandomHash()
    expect(sut.base64ASCII.length).toEqual(64)
  })
})