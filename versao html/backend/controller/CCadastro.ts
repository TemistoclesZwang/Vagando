import { Cadastro } from "../models/MCadastro";
import { RCadastro } from "../repository/RCadastro";
import { Request, Response } from "express";


const cadastro: RCadastro = new RCadastro();

export default class CCadastro {


    getAllCadastros = async (request: Request, response: Response) => {
        const dados = await cadastro.retrieveAll();
        return response.json(await dados);

    }

    createCadastro = async (request: Request, response: Response) => {
        const {
            tipoUsuario,
            tipoIdentificador,
            nome,
            dataNascimento,
            email,
            password,
            tecnologias
        } = request.body;

        const novoCadastro: Cadastro = new Cadastro(
            tipoUsuario,
            tipoIdentificador,
            nome,
            dataNascimento,
            email,
            password,
            tecnologias
        );

        cadastro.create(novoCadastro)
        return response.status(200).json({});

    }

}


