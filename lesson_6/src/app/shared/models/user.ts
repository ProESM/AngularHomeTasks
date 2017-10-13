export interface IUser {
    email: string;
    password: string;
    $id?: string;
}

export class User implements IUser {
    email: string;
    password: string;
    $id?: string;
}