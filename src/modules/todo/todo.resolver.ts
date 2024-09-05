import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';

// ENUMS
import { TodoProviderEnum } from './enums/todo-provider.enum';

// GUARDS
import { GqlJWTGuard } from '../auth/guards/gql-jwt.guard';

// DECORATORS
import { CurrentUser } from '../auth/decorators/user.decorator';

// INTERFACES
import { ITodoService } from './interfaces/todo-service.interface';
import { IUserRequest } from '../auth/interfaces/user-request.interface';

// DTOS
import { TodoDTO } from './dtos/todo.dto';
import { CreateTodoDTO } from './dtos/create-todo.dto';
import { UpdateTodoDTO } from './dtos/update-todo.dto';

@UseGuards(GqlJWTGuard)
@Resolver()
export class TodoResolver {
	constructor(
		@Inject(TodoProviderEnum.TODO_SERVICE)
		private readonly todoService: ITodoService,
	) {}

	@Query(() => [TodoDTO])
	public async getTodos(@CurrentUser() user: IUserRequest) {
		return this.todoService.getTodos(user.id);
	}

	@Mutation(() => TodoDTO)
	public async createTodo(
		@CurrentUser() user: IUserRequest,
		@Args('input') input: CreateTodoDTO,
	) {
		return this.todoService.createTodo(user.id, input);
	}

	@Mutation(() => TodoDTO)
	public async updateTodo(
		@CurrentUser() user: IUserRequest,
		@Args('input') input: UpdateTodoDTO,
	) {
		return this.todoService.updateTodo(user.id, input);
	}
}
