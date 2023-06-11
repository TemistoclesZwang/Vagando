import CCadastro from "../controller/CCadastro";
// import { Cadastro } from "../models/MCadastro";
import { Router, Request, Response } from 'express';

// export const rotas: Router = Router()


const router = Router();
const ccadastro: CCadastro = new CCadastro();

router.get("/cadastro",  ccadastro.getAllCadastros) // ! por que eu iria querer recuperar os dados do cadastro?
router.post("/criar/cadastro",  ccadastro.createCadastro)

export default router;
