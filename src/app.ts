import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './router'
import AuthMiddleware from './middleware/Auth.middleware'
import EnvUtil from './utils/Env.util'

const app = express()
app.use(cors({ origin: EnvUtil.origins() }))
app.use(bodyParser.json())
app.use(AuthMiddleware.verify)
app.use('/', router)

app.listen(80, () => {
  console.log('Yarder server running')
})
