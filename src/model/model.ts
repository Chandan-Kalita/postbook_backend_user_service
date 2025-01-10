import { z } from "zod"

export const LoginReq = z.object({
    username: z.string(),
    password: z.string()
})

export type TypeLoginReqModel = z.infer<typeof LoginReq>


export const ProfileUpdateReq = z.object({
    name: z.string(),
})

export type TypeProfileUpdateReqModel = z.infer<typeof ProfileUpdateReq>


export const PostCreateReq = z.object({
    content: z.string(),
})

export type TypePostCreateModel = z.infer<typeof PostCreateReq>

export const PostFindManyReq = z.object({
    take: z.string(),
    skip: z.string(),
})

export type TypePostFindManyModel = z.infer<typeof PostFindManyReq>
