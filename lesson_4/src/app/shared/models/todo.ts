import { ITodo } from './itodo';

export class Todo implements ITodo {    
    id: string;
    title: string;    
    description: string;    
    tags: string[];    
    statusId: number;
    statusName: string;
}