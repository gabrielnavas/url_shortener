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
    while (counter < this._hashLength) {
      const positionRandom = Math.floor(Math.random() * this._base64ASCII.length)
      hashRandom += this._base64ASCII[positionRandom]
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
