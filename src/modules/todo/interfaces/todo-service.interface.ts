// DTOS
import { CreateTodoDTO } from '../dtos/create-todo.dto';
import { TodoDTO } from '../dtos/todo.dto';
import { UpdateTodoDTO } from '../dtos/update-todo.dto';

export interface ITodoService {
	createTodo(ownerId: string, data: CreateTodoDTO): Promise<TodoDTO>;
	getTodos(ownerId: string): Promise<TodoDTO[]>;
	updateTodo(ownerId: string, data: UpdateTodoDTO): Promise<TodoDTO>;
	deleteTodo(todoId: string, ownerId: string): Promise<string>;
}
