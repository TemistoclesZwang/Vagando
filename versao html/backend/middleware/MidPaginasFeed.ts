import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';


// .essa senha precisa ser a mesma usada no controller que criou o token

const MidPaginasFeed = (request: Request, response: Response, next: NextFunction) => {
    const token = response.locals.token;



    if (token) {
        const decodedToken = request.token;
        // O decodedToken contém as informações decodificadas do token JWT

        // Exemplo: Acesse a propriedade "userId" do decodedToken
        // const userId = decodedToken.userId;

        // Faça qualquer processamento adicional necessário com as informações do token

        // Continue com o fluxo normal da aplicação
        next();
    } else {
        // O usuário não está autenticado, faça o tratamento apropriado aqui
        response.status(401).json({ error: 'Usuário não autenticado' });
    }
};


//! exemplo de uso de outro middleware sem ter que validar de novo o token do usuario
// app.get('/rota-protegida', MidLogin, anotherMiddleware, (req, res) => {
//   });

export default MidPaginasFeed;
