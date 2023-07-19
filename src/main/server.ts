import { App } from '@/main/app'

const PORT = (process.env.PORT != null)
  ? Number(process.env.PORT)
  : 3001

const app = new App()

app.app.listen(
  PORT,
  () => `[ * ] SERVER AT PORT ${PORT}`
)
