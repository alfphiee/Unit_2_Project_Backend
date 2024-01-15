import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import userRouter from './routes/users.js'


const app = express()
const port = process.env.PORT

mongoose.connect(process.env.DATABASE_URL)

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    console.log('hey')
    res.sendStatus(200)
})

app.use('/users', userRouter)

app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})