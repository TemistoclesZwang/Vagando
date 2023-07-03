import { Vagas } from "../models/MVagas";
import * as sqlite3 from 'sqlite3';



export class RVagas {
    private db: sqlite3.Database;

    constructor() {
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
        CREATE TABLE IF NOT EXISTS Vagas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            idDaEmpresa  TEXT,
            nomeEmpresa TEXT,
            tituloVaga TEXT,
            salario NUMBER,
            date_time TEXT DEFAULT (datetime('now'))
            )
            `;
        this.db.run(query, (err) => {
            if (err) {
                console.error('Erro ao criar a tabela:', err);
            }
        });
    }




    async create(vaga: Vagas) {
        try {
            const query = `INSERT INTO Vagas (
                idDaEmpresa,
                nomeEmpresa,
                tituloVaga,
                salario) VALUES (?, ?, ?, ?)`;
            return new Promise((resolve, reject) => {

                this.db.run(query, [
                    vaga.idDaEmpresa,
                    vaga.nomeEmpresa,
                    vaga.tituloVaga,
                    vaga.salario,
                ], function (err) {
                    if (err) {
                        console.error('Erro ao inserir vaga:', err);
                        reject(err);
                    } else {
                        console.log('Vaga criada com sucesso!');
                    }
                });
            });
        } catch (error) {
            console.error('Erro ao inserir vaga:', error);
            throw error;
        }
    }


    async retrieveAllVagas() {
        try {
            const query: string = `SELECT * FROM Vagas`;
            return new Promise((resolve, reject) => {
                this.db.all(query, (err, rows) => {
                    if (err) {
                        console.error('Erro ao obter vaga:', err);
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });
        } catch (error) {
            console.error('Erro ao obter vaga:', error);
            throw error;
        }
    }

    async retrieveVagasOnDemand(pagina: number, idDaEmpresa: string): Promise<any> {
        try {
            const registrosPorPagina = 2;
            const offset = (pagina - 1) * registrosPorPagina;
            console.log('id empresa',idDaEmpresa);
            
            console.log(pagina - 1);
            const query = `SELECT * FROM Vagas WHERE idDaEmpresa <> ${idDaEmpresa} LIMIT ${registrosPorPagina} OFFSET ${offset}`;
            return new Promise((resolve, reject) => {
                this.db.all(query, (err, rows) => {
                    if (err) {
                        console.error('Erro ao recuperar vagas:', err);
                    } else {
                        console.log('retorno demanda', rows);

                        resolve(rows)
                    }
                });
            })
        } catch (error) {
            console.error('Erro ao obter cadastro:', error);
            throw error;
        }
    }

}


