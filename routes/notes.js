import express from 'express'
import notesCtrl from '../controllers/notesCtrl.js'

const router = express.Router({ mergeParams: true })


router.get('/', notesCtrl.getAll)

router.get('/:noteId', notesCtrl.getOne)

router.post('/', notesCtrl.create)

router.put('/:noteId', notesCtrl.update)

router.delete('/:noteId', notesCtrl.delete)

export default router