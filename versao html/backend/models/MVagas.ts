import { IVagas } from './interfaces/IVagas';


export class Vagas implements IVagas {
    public idDaEmpresa: string;
    public nomeEmpresa: string;
    public tituloVaga: string; 
    public salario: number; 


    constructor(idDaEmpresa: string, nomeEmpresa: string, tituloVaga: string, salario: number) {
        this.idDaEmpresa = idDaEmpresa;
        this.nomeEmpresa = nomeEmpresa;
        this.tituloVaga = tituloVaga;
        this.salario = salario;
    }
}