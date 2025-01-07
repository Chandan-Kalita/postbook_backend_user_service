import {Request,Response} from  "express"

export class Validation{
    static validate(schema:any, inputType:ReqPayloadType){
        return function (req:Request,res:Response,next:any){
            if(inputType == ReqPayloadType.BODY){
                if(schema.parse(req.body)){
                    next()
                }
            }else if(inputType == ReqPayloadType.QUERY){
                if(schema.parse(req.query)){
                    next()
                }
            }else if(inputType == ReqPayloadType.PATH){
                if(schema.parse(req.path)){
                    next()
                }
            }
        }
    }
}

export enum ReqPayloadType{
    BODY,
    QUERY,
    PATH
}