import { ICadastro } from './interfaces/ICadastro';


export class Cadastro implements ICadastro {
    public tipoUsuario: string;
    public tipoIdentificador: string; 
    public nome: string;
    public dataNascimento: string;
    public email: string;
    public password: string;

    constructor(tipoUsuario: string,tipoIdentificador:string, nome: string, dataNascimento: string, email: string, password: string) {
        this.tipoUsuario = tipoUsuario;
        this.tipoIdentificador = tipoIdentificador;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.email = email;
        this.password = password;

        function displayCadastro(cadastro: Cadastro) {
            console.log(`id: ${cadastro.tipoUsuario}`);
            console.log(`id: ${cadastro.tipoIdentificador}`);
            console.log(`nome: ${cadastro.nome}`);
            console.log(`text: ${cadastro.dataNascimento}`);
            console.log(`text: ${cadastro.email}`);
            console.log(`text: ${cadastro.password}`);


        }
    }
}



// const cadastro = new Cadastro('a','b','c','d','e','f','g');
// displayCadastro(post);

// module.exports = Post;