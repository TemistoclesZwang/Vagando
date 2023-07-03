import { Cadastro } from "../models/MCadastro";
import * as sqlite3 from 'sqlite3';
import { hash } from 'bcrypt';




export class RCadastro {
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
        this.db.run(query, (err) => {
            if (err) {
                console.error('Erro ao criar a tabela:', err);
            } 
        });
    }

    async recuperar(pagina: number) {
        try {

        const registrosPorPagina = 2;
        const offset = (pagina - 1) * registrosPorPagina;

        const query = `SELECT * FROM Cadastros LIMIT ${registrosPorPagina} OFFSET ${offset}`;

        this.db.all(query, (err, rows) => {
            if (err) {
                console.error('Erro ao recuperar registros:', err);
            } else {
                console.log('Registros recuperados:', rows);
            }
        });
    } catch (error) {
        console.error('Erro ao obter cadastro:', error);
        throw error;
    }
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

    async create(cadastro: Cadastro) {
        const hashedPassword = await hash(cadastro.password, 5);

        try {
            const query = `INSERT INTO Cadastros (
                tipoUsuario ,
                tipoIdentificador,
                nome ,
                dataNascimento ,
                email ,
                password,
                tecnologias) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            return new Promise((resolve, reject) => {

                this.db.run(query, [
                    cadastro.tipoUsuario,
                    cadastro.tipoIdentificador,
                    cadastro.nome,
                    cadastro.dataNascimento,
                    cadastro.email,
                    hashedPassword,
                    cadastro.tecnologias,
                ], function (err) {
                    if (err) {
                        console.error('Erro ao inserir dados:', err);
                        reject(err);
                    } else {
                        console.log('Dados inseridos com sucesso!');
                    }
                });
            });
        } catch (error) {
            console.error('Erro ao inserir dados:', error);
            throw error;
        }
    }



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

    async update(id: string, novaTecnologia: string) {
        let updateQuery = 'UPDATE posts SET';
        const paramsUpdate: string[] = [];
        if (novaTecnologia !== '') {
            updateQuery += ' tecnologias = ?,';
            paramsUpdate.push(novaTecnologia);


            updateQuery = updateQuery.slice(0, -1);
            //pra tirar a vírgula da query

            updateQuery += ' WHERE id = ?';
            paramsUpdate.push(id);

            try {
                const query: string = `SELECT * FROM Cadastros WHERE id = ?`;
                return new Promise((resolve, reject) => {
                    this.db.get(query, [id], (err, row) => {
                        if (err) {
                            console.error('Erro ao obter post:', err);
                            reject(err)
                            return null
                        } else {
                            this.db.run(updateQuery, paramsUpdate, (err) => {
                                if (err) {
                                    console.error('Erro ao atualizar post:', err);
                                } else {
                                    return (console.log('post atualizado com sucesso!'));
                                }
                            });
                        }
                    });
                });
            } catch (error) {
                console.error('Erro ao obter posts:', error);
                throw error;
            }

        }
    }


    async delete(id: string) {
        try {
            const query: string = `SELECT * FROM Cadastros WHERE id = ?`;
            return new Promise((resolve, reject) => {
                this.db.get(query, [id], (err, row) => {
                    if (err) {
                        console.error('Erro ao obter cadastro:', err);
                        reject(err)
                        return null
                    } else {
                        const queryDelete = `DELETE FROM Cadastros WHERE id = ?`;
                        this.db.run(queryDelete, [id], (err) => {
                            if (err) {
                                console.error('Erro ao atualizar cadastro:', err);
                            } else {
                                return (console.log('Cadastro excluido com sucesso!'));
                            }
                        });
                    }
                });
            });
        } catch (error) {
            console.error('Erro ao obter Cadastros:', error);
            throw error;
        }

    }


}
