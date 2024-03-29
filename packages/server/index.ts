import { forumRouter } from './routes/forum.routes'
import { userRouter } from './routes/user.routes'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import express from 'express'
import { themeRouter } from './routes/theme.routes'
import { sequelize } from './models'

dotenv.config()

const app = express()
app.use(cors())

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = Number(process.env.SERVER_PORT) || 3001

sequelize
  .sync()
  .then(() => {
    console.log('Synced db.')
  })
  .catch((err: any) => {
    console.log('Failed to sync db: ' + err.message)
  })

app.use('/api/', forumRouter, themeRouter, userRouter)

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
