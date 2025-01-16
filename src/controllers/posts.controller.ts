import express from "express"
import { LoginReq, PostCreateReq, PostFindManyReq, ProfileUpdateReq, TypeProfileUpdateReqModel } from "../model/model"
import { Validation, ReqPayloadType } from "../model/validation"
import { UserService } from "../service/user.service";
import { PostsService } from "../service/posts.service";

const postsRouter = express.Router();

const postsService = new PostsService();
postsRouter.post('/create', Validation.authenticate(), Validation.validate(PostCreateReq, ReqPayloadType.BODY), async function (req: any, res, next) {
    try {
        const user = req.user;
        const response = await postsService.createPost(req.body, user.id)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
});

postsRouter.get('/getAll', Validation.authenticate(), Validation.validate(PostFindManyReq, ReqPayloadType.QUERY), async function (req: any, res, next) {
    try {
        const user = req.user;
        const response = await postsService.getAll(req.query.take, req.query.skip, user.id)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
});

export { postsRouter }