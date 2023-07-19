import express, { Express } from 'express'
import { Server } from 'http'

export class App {

  private _app: Express

  get app() {
    return this._app
  }

  constructor() {
    this._app = express()

    this._app.post('/url', (req, res) => {
      res.status(200).json({
        hash: '123456'
      })
    })
  }
}