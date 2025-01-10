import { Request, Response } from "express"
import { verifyJwt } from "../utils/jwt"
import { UserService } from "../service/user.service"

export class Validation {
    static validate(schema: any, inputType: ReqPayloadType) {
        return function (req: Request, res: Response, next: any) {
            if (inputType == ReqPayloadType.BODY) {
                if (schema.parse(req.body)) {
                    next()
                }
            } else if (inputType == ReqPayloadType.QUERY) {
                if (schema.parse(req.query)) {
                    next()
                }
            } else if (inputType == ReqPayloadType.PATH) {
                if (schema.parse(req.path)) {
                    next()
                }
            }
        }
    }

    static authenticate() {
        return async function (req: any, res: Response, next: any) {
            if (req.headers.authorization) {
                const token = req.headers.authorization.split(' ')[1];
                try {
                    const user = verifyJwt(token)
                    const dbUser = await new UserService().getUser(user.username)
                    if (!dbUser) {
                        throw new Error("Unauthorized")
                    }
                    req.user = { username: dbUser.username, id: dbUser.id, name: dbUser.name }
                    next()
                } catch (error) {
                    res.status(401).send({ message: "Unauthorized" })
                }
            } else {
                res.status(401).send({ message: "Unauthorized" })
            }
        }
    }
}



export enum ReqPayloadType {
    BODY,
    QUERY,
    PATH
}