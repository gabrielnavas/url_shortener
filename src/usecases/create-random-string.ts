export interface CreateRandomString {
  execute: () => string
}

export class CreateRandomHash implements CreateRandomString {
  private readonly _base64ASCII: string
  private readonly hashLength: number

  get base64ASCII (): string {
    return this._base64ASCII
  }

  constructor (hashLength: number = 8) {
    this._base64ASCII = this.generateBase64ASCII()
    this.hashLength = hashLength
  }

  execute = (): string => {
    let hashRandom = ''
    let counter = 0
    while (counter < this.hashLength) {
      const positionRandom = Math.floor(Math.random() * this._base64ASCII.length)
      hashRandom += this._base64ASCII[positionRandom]
      counter++
    }
    return hashRandom
  }

  private generateBase64ASCII (): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lettersLowCase = letters.toLocaleLowerCase()
    const numbers = '0123456789'
    const symbols = '+/'
    return `${letters}${lettersLowCase}${numbers}${symbols}`
  }
}
