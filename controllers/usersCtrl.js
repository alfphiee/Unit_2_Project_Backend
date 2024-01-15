import User from '../models/User.js'

const getAll = async(req, res) => {
    const users = await User.find({})
    console.log(users)
    res.json(users)
}

const getOne = async(req, res) => {
    const user = await User.findById(req.params.id)
    res.json(user)
}

const create = (req, res) => {
    const userData = req.body
    const user = new User(userData)
    user.save()
    .then(() => res.sendStatus(200))
    .catch((err) => {
        res.sendStatus(500)
        console.error(err)
    })
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

const usersCtrl = {
    getAll,
    getOne,
    create,
    update,
    delete: deleteOne
}

export default usersCtrl