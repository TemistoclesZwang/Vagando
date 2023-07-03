import { RRetrieves } from "../repository/RRetrievesCadastro";
import { Request, Response } from "express";
import { tokenContext } from '../controller/CLogin';




export default class CRetrieves {
    private repositoryRetrieves: RRetrieves = new RRetrieves();
    
    retrievePages = async (request: Request, response: Response) => {
        const { id } = tokenContext
        const { numeroDaPagina } = request.body;

        if (numeroDaPagina && id) {
            const tipoUsuario = await this.repositoryRetrieves.retrieve(id)

            const cardsRetornados = await  this.repositoryRetrieves.retrieveOnDemand(numeroDaPagina,tipoUsuario['tipoUsuario'])

            return response.status(200).json({ cardsRetornados });
        }
        else {
            return response.status(401).json({ numeroDaPagina });

        }
    }


}
