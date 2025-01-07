import express from "express"
import { LoginReq } from "../model/model"
import { Validation, ReqPayloadType } from "../model/validation"

var userController = express.Router();


userController.post('/login', Validation.validate(LoginReq, ReqPayloadType.BODY), async function (req, res, next) {
    try {
        const response = {}
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
});

userController.get('/logout', async function (req, res, next) {
    try {
        const response = {}
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
});


export default userController