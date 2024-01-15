import express from 'express'
import sessionsCtrl from '../controllers/sessionsCtrl.js'

import notesRouter from './notes.js'

const router = express.Router({ mergeParams: true })

router.use('/:sessionId/notes', notesRouter)

router.get('/', sessionsCtrl.getAll)

router.get('/:sessionId', sessionsCtrl.getOne)

router.post('/', sessionsCtrl.create)

router.put('/:sessionId', sessionsCtrl.update)

router.delete('/:sessionId', sessionsCtrl.delete)

export default router