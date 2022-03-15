import { Todo } from './ITodo';

export interface Category {
    name: string;
    todos: Todo[];
    willAddTodo: boolean;
}
