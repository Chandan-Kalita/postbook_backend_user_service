import { z } from "zod"

export const LoginReq = z.object({
    username: z.string(),
    password: z.string()
})

export type TypeLoginReqModel = z.infer<typeof LoginReq>
