import { Todo } from './ITodo';

export interface Category {
    id: number
    name: string;
    todos: Todo[];
    willAddTodo: boolean;
    willAnimate: boolean;
}
