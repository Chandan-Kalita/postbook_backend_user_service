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
