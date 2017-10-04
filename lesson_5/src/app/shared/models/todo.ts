import { ITodo } from './itodo';

export class Todo implements ITodo {    
    id: string;
    title: string;    
    description: string;    
    tags: string[];    
    statusId: number;
    statusName: string;

    constructor() {}

    public clone(): ITodo {
        let newTodo = new Todo();
        newTodo.id = this.id;
        newTodo.title = this.title;
        newTodo.description = this.description;
        newTodo.tags = [];
        this.tags.forEach(t => newTodo.tags.push(t));
        newTodo.statusId = this.statusId;
        newTodo.statusName = this.statusName;
        return newTodo;
    }

    public copyValuesTo(updatedTodo: ITodo): void {
        updatedTodo.id = this.id;
        updatedTodo.title = this.title;
        updatedTodo.description = this.description;
        while (updatedTodo.tags.length > 0) {
            updatedTodo.tags.pop();
        }
        this.tags.forEach(t => updatedTodo.tags.push(t));
        updatedTodo.statusId = this.statusId;
        updatedTodo.statusName = this.statusName;
    }

    public copyValuesFrom(sourceTodo: ITodo): void {
        this.id = sourceTodo.id;
        this.title = sourceTodo.title;
        this.description = sourceTodo.description;

        if (this.tags !== undefined && this.tags !== null) {
            while (this.tags.length > 0) {
                this.tags.pop();
            }
        } else {
            this.tags = [];
        }       
        
        sourceTodo.tags.forEach(tag => this.tags.push(tag));
        this.statusId = sourceTodo.statusId;
        this.statusName = sourceTodo.statusName;
    }
}