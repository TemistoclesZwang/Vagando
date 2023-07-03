import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { tokenContext } from '../controller/CLogin';
import dotenv from 'dotenv';


dotenv.config();
const secretKey = process.env.JWT_KEY || '';

export const tokenIdContext = {
    id: undefined as string | undefined
}


const midAuth = (request: Request, response: Response, next: NextFunction) => {
    
    const token = tokenContext.token;

    if (token && secretKey) {
        jwt.verify(token, secretKey, (err, decoded: any) => {
            if (err) {
                return response.status(401).json({ message: 'Token inválido' });
            }
            console.log('id e email do token:', decoded.id, decoded.email);
            tokenIdContext.id = decoded.id

            next();
        });
    } else {
        response.status(401).json({ error: 'Usuário não autenticado' });
    }
};


export default midAuth;
