import { Cadastro } from "../models/MCadastro";
// import {sqlite3} from "sqlite3";
import * as sqlite3 from 'sqlite3';


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
            date_time TEXT DEFAULT (datetime('now'))
            )
            `;
            // FOREIGN KEY (id_post) REFERENCES Posts(id)
        this.db.run(query, (err) => {
            if (err) {
                console.error('Erro ao criar a tabela:', err);
            } else {
                console.log('Tabela criada com sucesso!!!');
            }
        });
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
    async create(cadastro: Cadastro) {
        try {
            const query = `INSERT INTO Cadastros (
                tipoUsuario ,
                tipoIdentificador,
                nome ,
                dataNascimento ,
                email ,
                password ) VALUES (?, ?, ?, ?, ?, ?)`;
                return new Promise((resolve, reject) => {
                    
                    this.db.run(query, [
                        cadastro.tipoUsuario ,
                        cadastro.tipoIdentificador,
                        cadastro.nome ,
                        cadastro.dataNascimento ,
                        cadastro.email ,
                        // ! o hash já tem que ser inserido aqui
                    cadastro.password], function (err) {
                    if (err) {
                        console.error('Erro ao inserir dados:', err);
                        reject(err);
                    } else {
                        console.log('Dados inseridos com sucesso!');
                        // resolve();
                        // !devolver novo usuario
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
// !refatorar
    async update(id: string, novoTitle: string, novoText: string, novoLike: number) {
        //para verificar se o usuário quer modificar text, likes ou os dois
        let updateQuery = 'UPDATE posts SET';
        const paramsUpdate: string[] = [];

        if (novoText !== '') {
            updateQuery += ' text = ?,';
            paramsUpdate.push(novoText);
        }
        if (novoTitle !== '') {
            updateQuery += ' title = ?,';
            paramsUpdate.push(novoText);
        }
        if (novoLike !== undefined) {
            updateQuery += ' likes = ?,';
            paramsUpdate.push(novoLike.toString());
        }

        updateQuery = updateQuery.slice(0, -1);
        //pra tirar a vírgula da query

        updateQuery += ' WHERE id = ?';
        paramsUpdate.push(id);

        try {
            const query: string = `SELECT * FROM posts WHERE id = ?`;
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
                                // só precisa de um print não precisa resolve
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