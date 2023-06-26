// import { Cadastro } from "../models/MCadastro";
import { RRetrieves } from "../repository/RRetrieves";
import { Request, Response } from "express";
// import { Router } from 'express';




export default class CRetrieves {
    private repositoryRetrieves: RRetrieves = new RRetrieves();
    
    retrievePages = async (request: Request, response: Response) => {
        const { numeroDaPagina } = request.body;

        if (numeroDaPagina) {
            const cardsRetornados = await this.repositoryRetrieves.retrieveOnDemand(numeroDaPagina)
            console.log(cardsRetornados);
            
            return response.status(200).json({ cardsRetornados });
        }
        else {
            return response.status(401).json({ numeroDaPagina });

        }
    }
}
