import User from '../models/User.js'
import Session from '../models/Session.js'
import Athlete from '../models/Athlete.js'

const getAll = async(req, res) => {
    const users = await User.find({})
    res.json(users)
}

const getOne = async(req, res) => {
    const user = await User.findById(req.params.id)
    res.json(user)
}

const create = async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email})
        if(!user) {
            user = new User(req.body)
            await user.save()
            res.sendStatus(201)
        } else {
            const now = new Date()
            user = await User.findOneAndUpdate({email: req.body.email}, {lastLogin: now}, {new: true})
            res.sendStatus(200)
        }
    } catch (err) {
        console.error(err)
        res.status(500).send("An error occured while processing this request")
    }
}

const update = (req, res) => {
    User.updateOne({"_id": req.params.id}, req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
        res.sendStatus(500)
        console.error(err)
    })
}

const deleteOne = (req, res) => {
    User.deleteOne({"_id": req.params.id})
    .then(() => res.sendStatus(200))
    .catch((err) => {
        res.sendStatus(500)
        console.error(err)
    })
}

const getRelatedAthletes = async (req, res) => {
    try {
        const sessions = await Session.find({coachId: req.params.id})
        const athleteIds = [...new Set(sessions.map(session => session.athleteId.toString()))]
        const athletes = await Athlete.find({'_id': { $in: athleteIds }})
        res.json(athletes)
    } catch(err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
}

const usersCtrl = {
    getAll,
    getOne,
    create,
    update,
    delete: deleteOne,
    getRelatedAthletes
}

export default usersCtrl