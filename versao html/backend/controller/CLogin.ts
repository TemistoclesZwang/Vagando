import { Login } from "../models/MLogin";
import { RLogin } from "../repository/RLogin";
import { Request, Response } from "express";
import { Router } from 'express';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const login: RLogin = new RLogin();

export default class CLogin {
    generateToken = (payload: object): string => {
        // const secretKey = process.env.JWT_KEY
        // !usar variável de ambiente
        const secretKey: string = 'teste'
        // Defina a chave secreta para assinar o token

        // Defina as opções do token, como o tempo de expiração
        const options:Object = {
            expiresIn: '1h' // Token expira em 1 hora
        };

        // Gere o token JWT com o payload, a chave secreta e as opções
        const token = jwt.sign(payload, secretKey, options);
        
        return token;
    }

    checkPassword = async (request: Request, response: Response) => {
        // request.setTimeout(5000);
        const {
            email,
            password
        } = request.body;
        // . o compare pega a senha e gera um hash igual o do banco ?
        const checkEmailReturnPass: string = await login.verifyEmail(email)
        const isPasswordValid = await compare(password, checkEmailReturnPass);

        if (isPasswordValid) {
            const token = this.generateToken({ email: 'email@example.com' });
            // compara a senha com o hash do BD
            request.headers.authorization = `Bearer ${token}`;

            return response.status(200).json({ token });
        }
        else {
            return response.status(401).json({ isPasswordValid });

        }

    }
}

