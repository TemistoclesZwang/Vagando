import { Cadastro } from "../models/MCadastro";
// import {sqlite3} from "sqlite3";
import * as sqlite3 from 'sqlite3';
import * as fs from 'fs';

export class RLogin {

    private db: sqlite3.Database;

    constructor() {
        const databasePath = '../../data.db';
        if (!fs.existsSync(databasePath)) {
            console.error('Arquivo do banco de dados não encontrado.');
            process.exit(1);
        }

        this.db = new sqlite3.Database(databasePath);
    }
    async signin(email: string,password: string): Promise < any > {

        //. quando o ID não é encontrado retorna unfedined e não da erro
        try {
            // const query: string = `SELECT * FROM Cadastros WHERE id = ?`;
            const query: string = `SELECT password FROM Cadastros WHERE email = ?`;

            return new Promise((resolve, reject) => {
                this.db.get(query, [email], (err, row: any) => {
                    if (err) {
                        console.error('Erro ao obter cadastro:', err);
                        reject(err)
                        // return null
                    } else {
                        resolve(row);
                        // return row;
                    }
                });
            });
        } catch(error) {
            console.error('Erro ao obter cadastros:', error);
            throw error;
        }
    };
}



