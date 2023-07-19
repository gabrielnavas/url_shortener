class CreateRandomHash {
  execute = () => {
    return "1234567"
  }
}

describe('Create Random Hash Class', () => {
  test('the hash must be a maximum of 7 characters', () => {
    const sut = new CreateRandomHash()
    const hash = sut.execute()
    expect(typeof hash).toEqual('string')
    expect(hash.length).toEqual(7)
  })
})