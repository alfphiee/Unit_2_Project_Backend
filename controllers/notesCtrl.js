import Note from '../models/Note.js'

const getAll = async(req, res) => {
    const notes = await Note.find({"sessionId": req.params.sessionId})
    res.json(notes)
}

const getOne = async(req, res) => {
    const note = await Note.findById(req.params.noteId)
    res.json(note)
}

const create = (req, res) => {
    const noteData = req.body
    req.body.sessionId = req.params.sessionId
    const note = new Note(noteData)
    note.save()
    .then(() => res.sendStatus(200))
    .catch((err) => {
        res.sendStatus(500)
        console.error(err)
    })
}

const update = (req, res) => {
    Note.updateOne({"_id": req.params.noteId}, req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
        res.sendStatus(500)
        console.error(err)
    })
}

const deleteOne = (req, res) => {
    Note.deleteOne({"_id": req.params.noteId})
    .then(() => res.sendStatus(200))
    .catch((err) => {
        res.sendStatus(500)
        console.error(err)
    })
}

const notesCtrl = {
    getAll,
    getOne,
    create,
    update,
    delete: deleteOne
}

export default notesCtrl