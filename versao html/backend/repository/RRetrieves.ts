import { Cadastro } from "../models/MCadastro";
// import {sqlite3} from "sqlite3";
import * as sqlite3 from 'sqlite3';
// import bcrypt from 'bcrypt'
import { hash } from 'bcrypt';
import * as fs from 'fs';




export class RRetrieves {
    private db: sqlite3.Database;

    constructor() {
        // !refatorar para detecta se db já existe
        this.db = new sqlite3.Database('data.db', (err) => {
            if (err) {
                console.error('Erro ao abrir o banco de dados:', err);
            } else {
                this.createTable();
            }
        });

    }

    private createTable(): void {

        const query: string = `
        CREATE TABLE IF NOT EXISTS Cadastros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tipoUsuario  TEXT,
            tipoIdentificador TEXT,
            nome TEXT,
            dataNascimento TEXT,
            email TEXT,
            password TEXT,
            tecnologias TEXT,
            date_time TEXT DEFAULT (datetime('now'))
            )
            `;
        // FOREIGN KEY (id_post) REFERENCES Posts(id)
        // ! se o banco de dados existe, não preciso fazer nada
        this.db.run(query, (err) => {
            if (err) {
                console.error('Erro ao criar a tabela:', err);
            } else {
                console.log('Tabela criada com sucesso!');
            }
        });
    }

    async retrieveOnDemand(pagina: number): Promise < any >  {
        try {

        const registrosPorPagina = 2;
        const offset = (pagina - 1) * registrosPorPagina;

        const query = `SELECT * FROM Cadastros LIMIT ${registrosPorPagina} OFFSET ${offset}`;
        return new Promise((resolve, reject) => {
        this.db.all(query, (err, rows) => {
            if (err) {
                console.error('Erro ao recuperar registros:', err);
            } else {
                // console.log('Registros recuperados:', rows);
                resolve(rows)
            }
        });
    })
    } catch (error) {
        console.error('Erro ao obter cadastro:', error);
        throw error;
    }
    // Exemplo de uso da função recuperar
    // recuperar(1); // Recupera os registros de 1 a 10
    // recuperar(2); // Recupera os registros de 11 a 20
}


    async retrieveAll() {
        try {
            const query: string = `SELECT * FROM Cadastros`;
            return new Promise((resolve, reject) => {
                this.db.all(query, (err, rows) => {
                    if (err) {
                        console.error('Erro ao obter cadastro:', err);
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });
        } catch (error) {
            console.error('Erro ao obter cadastro:', error);
            throw error;
        }
    }

    // id , tipoUsuario ,tipoIdentificado, nome , dataNascimento , email , password


    async retrieve(id: string): Promise<any> {

        //. quando o ID não é encontrado retorna unfedined e não da erro
        try {
            const query: string = `SELECT * FROM Cadastros WHERE id = ?`;
            return new Promise((resolve, reject) => {
                this.db.get(query, [id], (err, row: any) => {
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
        } catch (error) {
            console.error('Erro ao obter cadastros:', error);
            throw error;
        }
    };

    }

