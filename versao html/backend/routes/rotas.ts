import { Router } from 'express';
import CCadastro from "../controller/CCadastro";
import CFeed from "../controller/CFeed";
import CRetrieves from "../controller/CRetrieves";
import CLogin from "../controller/CLogin";
import CVagas from "../controller/CVagas";
import MidLogin from '../middleware/MidFeed';
import midAuth from '../middleware/MidAuth';



const router = Router();
const ccadastro: CCadastro = new CCadastro();
const clogin: CLogin = new CLogin();
const cfeed: CFeed = new CFeed();
const cretrieves: CRetrieves = new CRetrieves();
const cvagas: CVagas = new CVagas();

router.get("/cadastro",  ccadastro.getAllCadastros) //!não implementado
router.post("/criar/cadastro",  ccadastro.createCadastro)
router.post("/signin",  clogin.checkPassGenToken) 
router.get("/feed",MidLogin,  cfeed.retrieveCardData) 
// .o middleware é executado antes de recuperar os dados do card
router.put("/feed/pagina",midAuth, cretrieves.retrievePages) 
// .o mid paginas recebe o token do mid login para não precisar autenticar de novo
router.post("/vagas",midAuth, cvagas.createVaga) 
router.get("/vagas/test",midAuth, cvagas.getAllVagas) 
router.post("/vagas/historico",midAuth, cvagas.getVagas) 




export default router;
