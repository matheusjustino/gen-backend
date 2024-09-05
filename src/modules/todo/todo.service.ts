import { Injectable, Logger } from '@nestjs/common';

// INTERFACES
import { ITodoService } from './interfaces/todo-service.interface';

// SERVICES
import { PrismaService } from '../prisma/prisma.service';

// DTOS
import { TodoDTO } from './dtos/todo.dto';
import { CreateTodoDTO } from './dtos/create-todo.dto';
import { UpdateTodoDTO } from './dtos/update-todo.dto';

@Injectable()
export class TodoService implements ITodoService {
	private readonly logger: Logger = new Logger(TodoService.name);

	constructor(private readonly prismaService: PrismaService) {}

	public async createTodo(
		ownerId: string,
		data: CreateTodoDTO,
	): Promise<TodoDTO> {
		this.logger.log(`createTodo`);

		return this.prismaService.todo.create({
			data: {
				...data,
				ownerId,
			},
		});
	}

	public async getTodos(ownerId: string): Promise<TodoDTO[]> {
		this.logger.log(`getTodos`);

		return this.prismaService.todo.findMany({
			where: {
				ownerId,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	public async updateTodo(
		ownerId: string,
		{ id, ...data }: UpdateTodoDTO,
	): Promise<TodoDTO> {
		this.logger.log(`updateTodo`);

		return this.prismaService.todo.update({
			where: {
				ownerId,
				id,
			},
			data,
		});
	}
}
