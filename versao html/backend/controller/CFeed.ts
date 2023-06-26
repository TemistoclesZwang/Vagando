// import { Cadastro } from "../models/MCadastro";
import { RCadastro } from "../repository/RCadastro";
import { Request, Response } from "express";
// import { Router } from 'express';
// ; injeção de dependencia, essa classe só usa os dados que já existem no cadastro 

// . pegar get all do CCadastro
// . pegar get Id do RCadastro



export default class CFeed {
    private repositoryCadastro: RCadastro = new RCadastro();
    
    retrieveCardData = async (request: Request, response: Response) => {
        const { id } = request.body;

        if (id) {
            const dadosRetornados = await this.repositoryCadastro.retrieve(id)
            return response.status(200).json({ dadosRetornados });
        }
        else {
            return response.status(401).json({ id });

        }
    }
}
