import { RRetrieves } from "../repository/RRetrievesCadastro";
import { Request, Response } from "express";
import { tokenContext } from '../controller/CLogin';


export default class CFeed {
    private repositoryRetrieves: RRetrieves = new RRetrieves();
    
    retrieveCardData = async (request: Request, response: Response) => {
        const { id } = tokenContext
        
        if (id) {
            const dadosRetornados = await this.repositoryRetrieves.retrieve(id)
            return response.status(200).json({ dadosRetornados });
        }
        else {
            return response.status(401).json({ id });

        }
    }
}
