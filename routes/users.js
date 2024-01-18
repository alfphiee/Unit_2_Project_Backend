import express from 'express'

import sessionRouter from './sessions.js'
import usersCtrl from '../controllers/usersCtrl.js'
import sessionsCtrl from '../controllers/sessionsCtrl.js'

const router = express.Router()

router.use('/:id/sessions', sessionRouter)

router.get('/', usersCtrl.getAll)

router.get('/:id', usersCtrl.getOne)

router.get('/:id/athletes', usersCtrl.getRelatedAthletes)

router.get('/:id/athletes/:athleteId/sessions', sessionsCtrl.getAthleteSessionsForCoach)

router.post('/', usersCtrl.create)

router.put('/:id', usersCtrl.update)

router.delete('/:id', usersCtrl.delete)



export default router