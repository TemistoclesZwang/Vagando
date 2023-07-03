import { Vagas } from "../models/MVagas";
import { RVagas } from "../repository/RVagas";
import { RCadastro } from "../repository/RCadastro";
import { Request, Response, NextFunction } from "express";
import { tokenIdContext } from '../middleware/MidAuth';


const vaga: RVagas = new RVagas();
const dadosCadastro: RCadastro = new RCadastro();

export default class CVagas {

    getAllVagas = async (request: Request, response: Response) => {
        const dados = await vaga.retrieveAllVagas();
        return response.json(await dados);
    }

    getVagasOnDemand = async (request: Request, response: Response) => {
        const { numeroDaPagina } = request.body;
        if (tokenIdContext.id && numeroDaPagina) {
            const idDaEmpresaNoBD = tokenIdContext.id;
            console.log('Id da empresa no banco',idDaEmpresaNoBD);
            
            const dados = await vaga.retrieveVagasOnDemand(numeroDaPagina, idDaEmpresaNoBD);
            return response.json(await dados);
        } else {
            response.status(401).json({ error: 'Token id vazio' });
        }
    }

    createVaga = async (request: Request, response: Response) => {
        if (tokenIdContext.id) {
            const idDaEmpresaNoBD = tokenIdContext.id;
            const pegaDadosDaEmpresa = await dadosCadastro.retrieve(idDaEmpresaNoBD)
            const pegarNomeEmpresa = pegaDadosDaEmpresa.nome

            const {
                tituloVaga,
                salario
            } = request.body;

            const novaVaga: Vagas = new Vagas(
                idDaEmpresaNoBD,
                await pegarNomeEmpresa,
                tituloVaga,
                salario
            );

            vaga.create(novaVaga)
            return response.status(200).json({});

        } else {
            response.status(401).json({ error: 'Token id vazio' });
        }
    }

}


