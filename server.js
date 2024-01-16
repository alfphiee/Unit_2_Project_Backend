import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import userRouter from './routes/users.js'
import User from './models/User.js'


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
app.get('/get-user-id', async (req, res) => {
    try {
        const email = req.query.email
        if(!email) {
            return res.status(400).send('Email is required')
        }
        const user = await User.findOne({email: email})
        if(!user) {
            return res.status(404).send('User not found')
        }
        res.json({userId: user._id})
    } catch (err) {
        res.status(500).send('Server Error')
    }
})

app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})