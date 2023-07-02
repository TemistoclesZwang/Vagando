import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { tokenContext } from '../controller/CLogin';


const secretKey: string = 'teste'

// .essa senha precisa ser a mesma usada no controller que criou o token

const MidLogin = (request: Request, response: Response, next: NextFunction) => {
    // const token = request.headers.authorization?.split(' ')[1];
    const token = tokenContext.token;
    // console.log('token',request.headers.authorization);
    
    // Obtenha o token do header Authorization

    if (!token) {
        return response.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return response.status(401).json({ message: 'Token inválido' });
        }

        // O token é válido, você pode fazer qualquer processamento adicional com o `decoded`
        

        // console.log(request);
        

        
        
        // Continue com o fluxo normal da aplicação
        next();
    });
};




export default MidLogin;
