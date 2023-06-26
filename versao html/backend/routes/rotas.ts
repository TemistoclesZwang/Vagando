import CCadastro from "../controller/CCadastro";
import CFeed from "../controller/CFeed";
import CRetrieves from "../controller/CRetrieves";

import CLogin from "../controller/CLogin";
// import { Cadastro } from "../models/MCadastro";
import { Router, Request, Response } from 'express';
import MidLogin from '../middleware/MidLogin';
import MidPaginasFeed from '../middleware/MidPaginasFeed';

// export const rotas: Router = Router()


const router = Router();
const ccadastro: CCadastro = new CCadastro();
const clogin: CLogin = new CLogin();
const cfeed: CFeed = new CFeed();
const cretrieves: CRetrieves = new CRetrieves();

router.get("/cadastro",  ccadastro.getAllCadastros) // ! por que eu iria querer recuperar os dados do cadastro?
router.post("/criar/cadastro",  ccadastro.createCadastro)
router.post("/signin",  clogin.checkPassword) 
router.post("/feed",MidLogin,  cfeed.retrieveCardData) 
// .o middleware é executado antes de recuperar os dados do card
router.post("/feed/pagina",MidLogin, cretrieves.retrievePages) 
// .o mid paginas recebe o token do mid login para não precisar autenticar de novo




export default router;
