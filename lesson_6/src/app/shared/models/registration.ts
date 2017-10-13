export interface IRegistration {
    email: string;
    password: string;
    confirmPassword: string;
}

export class Registration implements IRegistration {    
    email: string;
    password: string;
    confirmPassword: string;

    constructor() {}
}