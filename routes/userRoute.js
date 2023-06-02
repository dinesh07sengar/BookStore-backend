const express = require('express')
const jwt = require('jsonwebtoken');
const {Usermodel} = require('../modals/user.modal')

const route = express.Router();

route.post("/register", async (req, res) => {
    try {
        let data = await Usermodel.create(req.body)
        res.status(200).send({ "msg": "data succesully added", "data": data })

    } catch (error) {
        req.status(408).send(error)
    }
})

route.post("/login", async (req, res) => {
    let { email, password } = req.body
    try {
        let data = await Usermodel.findOne({ email, password })
        if (data) {
            const token = jwt.sign({email},process.env.SECRETE_KEY);
            res.status(200).send({ "msg": "succesfully login", "token": token })
        }
        else {
            res.status(404).send("wrong credentail")
        }
    } catch (error) {
        res.status(405).send(error)

    }
})
module.exports={route}