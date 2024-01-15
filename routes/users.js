import express from 'express'

import sessionRouter from './sessions.js'
import usersCtrl from '../controllers/usersCtrl.js'

const router = express.Router()

router.use('/:id/sessions', sessionRouter)

router.get('/', usersCtrl.getAll)

router.get('/:id', usersCtrl.getOne)

router.post('/', usersCtrl.create)

router.put('/:id', usersCtrl.update)

router.delete('/:id', usersCtrl.delete)

export default router