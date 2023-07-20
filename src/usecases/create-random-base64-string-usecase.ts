export interface CreateRandomString {
  execute: () => string
  getReferenceASCII: () => string
  getStringLength: () => number
  getHowManyHashesCount: () => number
}

export class CreateRandomBase64StringUsecase implements CreateRandomString {
  private readonly _base64ASCII: string

  getReferenceASCII (): string {
    return this._base64ASCII
  }

  getStringLength = (): number => {
    return this._hashLength
  }

  constructor (private readonly _hashLength: number = 8) {
    this._base64ASCII = this.generateBase64ASCII()
  }

  execute = (): string => {
    let hashRandom = ''
    let counter = 0
    const referenceBase64ASCII = this.getReferenceASCII()
    const referenceBase64ASCIILength = referenceBase64ASCII.length
    const stringBase64Length = this.getStringLength()
    let positionRandom: number
    while (counter < stringBase64Length) {
      positionRandom = Math.floor(Math.random() * referenceBase64ASCIILength)
      hashRandom += referenceBase64ASCII[positionRandom]
      counter++
    }
    return hashRandom
  }

  getHowManyHashesCount = (): number => {
    const referenceASCIILength: number = this.getReferenceASCII().length
    return Math.pow(referenceASCIILength, this.getStringLength())
  }

  private generateBase64ASCII (): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lettersLowCase = letters.toLocaleLowerCase()
    const numbers = '0123456789'
    const symbols = '+/'
    return `${letters}${lettersLowCase}${numbers}${symbols}`
  }
}
