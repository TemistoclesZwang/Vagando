// import { Cadastro } from "../models/MCadastro";
import { RRetrieves } from "../repository/RRetrievesCadastro";
import { Request, Response } from "express";
import { tokenContext } from '../controller/CLogin';


// import { Router } from 'express';
// ; injeção de dependencia, essa classe só usa os dados que já existem no cadastro 

// . pegar get all do CCadastro
// . pegar get Id do RCadastro



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
