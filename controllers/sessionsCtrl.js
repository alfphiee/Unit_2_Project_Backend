import Session from '../models/Session.js'

const getAll = async(req, res) => {
    const sessions = await Session.find({"coachId": req.params.id})
    res.json(sessions)
}

const getOne = async(req, res) => {
    const session = await Session.findById(req.params.sessionId)
    res.json(session)
}

const create = (req, res) => {
    const sessionData = req.body
    req.body.coachId = req.params.id
    const session = new Session(sessionData)
    session.save()
    .then(() => res.sendStatus(200))
    .catch((err) => {
        res.sendStatus(500)
        console.error(err)
    })
}

const update = (req, res) => {
    Session.updateOne({"_id": req.params.sessionId}, req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
        res.sendStatus(500)
        console.error(err)
    })
}

const deleteOne = (req, res) => {
    Session.deleteOne({"_id": req.params.sessionId})
    .then(() => res.sendStatus(200))
    .catch((err) => {
        res.sendStatus(500)
        console.error(err)
    })
}

const sessionsCtrl = {
    getAll,
    getOne,
    create,
    update,
    delete: deleteOne
}

export default sessionsCtrl