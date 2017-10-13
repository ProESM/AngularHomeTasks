export interface ITodoFilter {
    id: string;
    title: string;
    //description: string;
    tags: string[];
    //statusId: number;
}

export class TodoFilter implements ITodoFilter {    
    id: string;
    title: string;
    //description: string;
    tags: string[];
    //statusId: number;

    constructor() {}
}