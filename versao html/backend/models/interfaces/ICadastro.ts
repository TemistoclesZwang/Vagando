
export interface ICadastro {
    tipoUsuario: string; //aluno ou empresa
    tipoIdentificador: string; //cnpj ou matricula
    nome: string;
    dataNascimento: string;
    email: string;
    password: string;
    tecnologias: string;
}