import express from 'express'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { createUser, getAllUsers, getUserById, upDateUser, deleteUser } from '../controller/usersController'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'

//Middleware de JWT para ver si estamos autenticados

const authenticationToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]//extrae el token de header
    if(!token){
        return res.status(401).json({error: 'No autorizado' })
    }

    jwt.verify(token, JWT_SECRET, (err, decoded)=>{
        if(err){
            console.error('Error en la autenticacion', err)
            return res.status(403).json({ error: 'No tienes acceso a este recurso' })
        }
        next()
    })

}

router.post('/', authenticationToken, createUser )
router.get('/', authenticationToken, getAllUsers )
router.get('/:id', authenticationToken, getUserById )
router.put('/:id', authenticationToken, upDateUser)
router.delete('/:id', authenticationToken, deleteUser)



export default router