import { Login } from "../models/MLogin";
import { RLogin } from "../repository/RLogin";
import { Request, Response } from "express";
import { Router } from 'express';
import { compare } from 'bcrypt';



const login: RLogin = new RLogin();

export default class CLogin {
    checkPassword = async (request: Request, response: Response) => {
        // request.setTimeout(5000);
        const {
            email,
            password
        } = request.body;
        // . o compare pega a senha e gera um hash igual o do banco ?
        const checkEmailReturnPass: string = await login.verifyEmail(email)
        const isPasswordValid = await compare(password,checkEmailReturnPass);
        
        if (isPasswordValid) {
            // compara a senha com o hash do BD
            return response.status(200).json({isPasswordValid});
    }
    else{
        return response.status(401).json({isPasswordValid});

    }
        
}
}

