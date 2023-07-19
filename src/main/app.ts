import express, { type Express } from 'express'

export class App {
  private readonly _app: Express

  get app (): Express {
    return this._app
  }

  constructor () {
    this._app = express()

    this._app.post('/url', (req, res) => {
      res.status(200).json({
        hash: '123456'
      })
    })
  }
}
