import Session from '../models/Session.js'
import Athlete from '../models/Athlete.js'

const getAll = async(req, res) => {
    let query = {coachId: req.params.id}
    if(req.query.status) query.status = req.query.status
    const sessions = await Session.find(query).sort({date: 1})
    res.json(sessions)
}

const getOne = async(req, res) => {
    const session = await Session.findById(req.params.sessionId)
    res.json(session)
}

const create = async (req, res) => {
    const {coachId, athleteContact, ...sessionData} = req.body
    try {
        let athlete = await Athlete.findOne({email: athleteContact})
        if(!athlete) {
            athlete = new Athlete({email: athleteContact })
            await athlete.save()
        }

        const session = new Session({
            coachId,
            athleteId: athlete._id,
            ...sessionData
        })
        await session.save()
        res.status(201).json(session)
    } catch(err) {
        //console.error(err)
        res.status(500).send("An error occured while creating the session")
    }
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