import jwt from 'jsonwebtoken'
import { UserPayload } from '../interface/User.dt'



export const createToken = (user: UserPayload) => {
    return jwt.sign({ id: user.id, email: user.email },
        process.env.APP_SECRET!, { expiresIn: process.env.EXPIRES_IN! })
}