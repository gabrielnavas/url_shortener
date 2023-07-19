import { CreateRandomHash } from '@/usecases/create-random-hash'
import express, { type Express } from 'express'

export class App {
  private readonly _app: Express

  get app (): Express {
    return this._app
  }

  constructor (
    private readonly createRandomHash = new CreateRandomHash(8)
  ) {
    this._app = express()

    this._app.post('/url', (req, res) => {
      const hash = this.createRandomHash.execute()
      res.status(200).json({
        hash,
        validity: Date.now()
      })
    })
  }
}
