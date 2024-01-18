import 'dotenv/config'
import express, { Router } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import serverless from 'serverless-http'

import userRouter from '../../routes/users.js'
import User from '../../models/User.js'


const api = express()

mongoose.connect(process.env.DATABASE_URL)

api.use(cors())
api.use(bodyParser.json())

api.get('/', (req, res) => {
    console.log('hey')
    res.sendStatus(200)
})

const router = Router()


router.use('/users', userRouter)
router.get('/get-user-id', async (req, res) => {
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

api.use('/api/', router)

export const handler = serverless(api)