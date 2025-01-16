import express from "express"
import { LoginReq, PaginationObj, PostCreateReq, PostFindManyReq, ProfileUpdateReq, TypeProfileUpdateReqModel } from "../model/model"
import { Validation, ReqPayloadType } from "../model/validation"
import { UserService } from "../service/user.service";
import { PostsService } from "../service/posts.service";
import { UsersProfileService } from "../service/users.service";

const usersProfileRouter = express.Router();

const userProfileService = new UsersProfileService();



usersProfileRouter.get('/:username/followers', Validation.authenticate(), async function (req: any, res, next) {
    try {
        const response = await userProfileService.getFollowers(req.params.username)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
});

usersProfileRouter.get('/:username/followers/count', Validation.authenticate(), async function (req: any, res, next) {
    try {
        const response = await userProfileService.getFollowersCount(req.params.username)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
});

usersProfileRouter.get('/:username/followings', Validation.authenticate(), async function (req: any, res, next) {
    try {
        const response = await userProfileService.getFollowings(req.params.username)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
});

usersProfileRouter.get('/:username/followings/count', Validation.authenticate(), async function (req: any, res, next) {
    try {
        const response = await userProfileService.getFollowingsCount(req.params.username)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
});

usersProfileRouter.get('/userSuggestions', Validation.authenticate(), Validation.validate(PaginationObj, ReqPayloadType.QUERY), async function (req: any, res, next) {
    try {
        const user = req.user;
        const response = await userProfileService.userSuggestions(user.id, req.query.take, req.query.skip)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
})

usersProfileRouter.post('/:userId/follow', Validation.authenticate(), async function (req: any, res, next) {
    try {
        const user = req.user;
        const response = await userProfileService.follow(user.id, req.params.userId)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
})

usersProfileRouter.delete('/:userId/follow', Validation.authenticate(), async function (req: any, res, next) {
    try {
        const user = req.user;
        const response = await userProfileService.unFollow(user.id, req.params.userId)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
})



usersProfileRouter.get('/userSuggestions', Validation.authenticate(), Validation.validate(PaginationObj, ReqPayloadType.QUERY), async function (req: any, res, next) {
    try {
        const user = req.user;
        const response = await userProfileService.userSuggestions(user.id, req.query.take, req.query.skip)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
})

// Get User Profile
usersProfileRouter.get('/:username', Validation.authenticate(), async function (req: any, res, next) {
    try {
        const response = await userProfileService.getProfile(req.params.username)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
});

export { usersProfileRouter }