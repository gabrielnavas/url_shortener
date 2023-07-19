import { App } from '@/main/app'
import supertest from 'supertest'

const app = new App().app

describe('HTTP POST Create Random Hash', () => {
  test('create a hash from url', async () => {
    const payload = {
      url: 'https://example.com/foo/bar'
    }
    const { statusCode, body, headers } = await supertest(app)
      .post('/url')
      .send(payload)

    expect(statusCode).toEqual(200)
    expect(headers['content-type']).toEqual('application/json; charset=utf-8')
    expect(typeof body.hash).toEqual('string')
    expect(typeof body.validity).toEqual('number')
  })
})
