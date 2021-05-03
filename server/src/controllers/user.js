const User = require("../models/user");

const {
  addUser,
  getUser,
  getAllUsers,
} = require('../utils/user')

const addUserController = async (res, req) => { // post
    try {
        const user = await addUser(req.body);
        res.status(200).send(user)
    } catch (e){
        res.status(400).send(e.message)
    }
}

const getUserController = async (res, req) => {
    try {
        const user = await getUser(req.body._id);
        res.status(200).send(user)
    } catch (e){
        res.status(400).send(e.message)
    }
}

const getAllUsersController = async (res, req) => {
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