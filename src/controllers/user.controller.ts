import express from "express"
import { LoginReq } from "../model/model"
import { Validation, ReqPayloadType } from "../model/validation"
import { UserService } from "../service/user.service";

var userRouter = express.Router();

const userService = new UserService();
userRouter.post('/login', Validation.validate(LoginReq, ReqPayloadType.BODY), async function (req, res, next) {
    try {
        const response = await userService.login(req.body)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
});

userRouter.get('/profile', Validation.authenticate(), async function (req: any, res, next) {
    try {
        const user = req.user;
        res.status(200).send(user)
    } catch (error) {
        next(error)
    }
});

userRouter.get('/logout', async function (req, res, next) {
    try {
        const response = {}
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
});


export default userRouter