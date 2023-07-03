import { RLogin } from "../repository/RLogin";
import { Request, Response } from "express";
import { compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
const secretKey = process.env.JWT_KEY || '';

export const tokenContext = {
    token: undefined as string | undefined,
    id: undefined as string | undefined,
    email:undefined as string | undefined
};

const login: RLogin = new RLogin();

export default class CLogin {
    generateToken = (payload: object): string => {
        const options:Object = {
            expiresIn: '15h'
        };

        const token = jwt.sign(payload, secretKey, options);
        
        return token;
    }

    checkPassGenToken = async (request: Request, response: Response) => {
        // request.setTimeout(5000);
        const {
            email,
            password
        } = request.body;
        // . o compare pega a senha e gera um hash igual o do banco 
        const checkEmailReturnPass: string = await login.verifyEmail(email)
        const checkIdForEmail: string = await login.returnIdForToken(email)
        const isPasswordValid = await compare(password, checkEmailReturnPass);

        if (isPasswordValid) {
            
            const token = this.generateToken({ 
                'id':checkIdForEmail,
                'email': email
            });
            // compara a senha com o hash do BD
            request.headers.authorization = `Bearer ${token}`;
            tokenContext.token = token
            tokenContext.id = checkIdForEmail
            tokenContext.email = email


            return response.status(200).json({ token });
        }
        else {
            return response.status(401).json({ isPasswordValid });
            
        }
        
    }
}


