import { ILogin } from './interfaces/ILogin';


export class Login implements ILogin {
    public email: string;
    public password: string; 

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}