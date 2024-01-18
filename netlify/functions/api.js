import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import serverless from 'severless-http'

import userRouter from '../../routes/users.js'
import User from '../../models/User.js'


const api = express()
const port = process.env.PORT

mongoose.connect(process.env.DATABASE_URL)

api.use(cors())
api.use(bodyParser.json())

api.get('/', (req, res) => {
    console.log('hey')
    res.sendStatus(200)
})

api.use('/users', userRouter)
api.get('/get-user-id', async (req, res) => {
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

api.listen(port, () => {
    console.log(`listening on port: ${port}`)
})