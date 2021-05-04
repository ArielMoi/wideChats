const User = require("../models/user");

const {
  addUser,
  getUser,
  getAllUsers,
} = require('../utils/user')

const addUserController = async (req, res) => { // post
    try {
        const user = await addUser(req.body.name, req.body.email);
        res.status(200).send(user)
    } catch (e){
        res.status(400).send(e.message)
    }
}

const getUserController = async (req, res) => {
    try {
        const user = await getUser(req.params.id);
        res.status(200).send(user)
    } catch (e){
        res.status(400).send(e.message)
    }
}

const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers()
        res.status(200).send(users)
    } catch (e){
        res.status(400).send(e.message)
    }
}

module.exports = {
    addUserController,
    getUserController,
    getAllUsersController
}