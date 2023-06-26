import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            token?: Object;
        }
    }
}


const secretKey: string = 'teste'

// .essa senha precisa ser a mesma usada no controller que criou o token

const MidLogin = (request: Request, response: Response, next: NextFunction) => {
    const token = request.headers.authorization?.split(' ')[1];
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

        // Você pode até adicionar o objeto `decoded` à requisição para uso posterior em outros middlewares ou controladores
        response.locals.token = decoded;

        
        
        // Continue com o fluxo normal da aplicação
        next();
    });
};

//! exemplo de uso de outro middleware sem ter que validar de novo o token do usuario
// app.get('/rota-protegida', MidLogin, anotherMiddleware, (req, res) => {
//   });

export default MidLogin;
