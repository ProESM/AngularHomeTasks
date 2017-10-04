export interface ITodo {
    id: string;
    title: string;    
    description: string;    
    tags: string[];    
    statusId: number;
    statusName: string;

    clone(): ITodo;

    copyValuesTo(updatedTodo: ITodo): void;

    copyValuesFrom(sourceTodo: ITodo): void;
}