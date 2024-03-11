import { User } from "../models/user.interfases"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'

export const generateToken = (user: User): string => {
    return jwt.sign({id: user.id, email: user.email}, JWT_SECRET, {expiresIn: '1h'} )
}