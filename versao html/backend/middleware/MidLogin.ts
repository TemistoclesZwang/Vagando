import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { tokenContext } from '../controller/CLogin';
import dotenv from 'dotenv';


dotenv.config();
const secretKey = process.env.JWT_KEY || '';


const MidLogin = (request: Request, response: Response, next: NextFunction) => {
    const token = tokenContext.token;
    if (!token) {
        return response.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return response.status(401).json({ message: 'Token inválido' });
        }
        next();
    });
};




export default MidLogin;
