import { propertyChanged } from '../decorators/property-changed';

export interface IUser {
    name: string;
    email: string;
    dob: Date;
    phone: string;
    picture: string;

    toString() : string;
}

export class User implements IUser {    
    //@propertyChanged
    name: string;
    //@propertyChanged
    email: string;
    //@propertyChanged
    dob: Date;
    //@propertyChanged
    phone: string;
    //@propertyChanged
    picture: string;
}