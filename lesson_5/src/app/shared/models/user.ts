export interface IUser {
    login: string;
    password: string;
    $id?: string;
}

export class User implements IUser {
    login: string;
    password: string;
    $id?: string;
}