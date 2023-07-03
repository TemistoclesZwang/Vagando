import { Router } from 'express';
import CCadastro from "../controller/CCadastro";
import CFeed from "../controller/CFeed";
import CRetrieves from "../controller/CRetrieves";
import CLogin from "../controller/CLogin";
import CVagas from "../controller/CVagas";
import MidLogin from '../middleware/MidLogin';
import midAuth from '../middleware/MidAuth';


const router = Router();
const ccadastro: CCadastro = new CCadastro();
const clogin: CLogin = new CLogin();
const cfeed: CFeed = new CFeed();
const cretrieves: CRetrieves = new CRetrieves();
const cvagas: CVagas = new CVagas();

router.get("/cadastro",  ccadastro.getAllCadastros) 
router.post("/criar/cadastro",  ccadastro.createCadastro)
router.post("/signin",  clogin.checkPassGenToken) 
router.get("/feed",MidLogin,  cfeed.retrieveCardData) 
router.put("/feed/pagina",midAuth, cretrieves.retrievePages) 
router.post("/vagas",midAuth, cvagas.createVaga) 
router.get("/vagas/test",midAuth, cvagas.getAllVagas) 
router.post("/vagas/historico",midAuth, cvagas.getVagasOnDemand) 



export default router;
