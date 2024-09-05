import { Test, TestingModule } from '@nestjs/testing';
import { TodoStatus } from '@prisma/client';

// INTERFACES
import { ITodoService } from './interfaces/todo-service.interface';

// SERVICES
import { TodoService } from './todo.service';

// SERVICES
import { PrismaService } from '../prisma/prisma.service';

describe('AuthService', () => {
	let service: ITodoService;
	const mockUser = {
		id: 'id',
		email: 'foo@bar.com',
		name: 'Foo Bar',
		password: 'password',
	};
	const mockTodo = {
		id: 'id',
		title: 'todo title',
		description: 'todo description',
		status: TodoStatus.OPEN,
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TodoService,
				{
					provide: PrismaService,
					useValue: {
						user: {
							findFirst: jest.fn().mockResolvedValue(mockUser),
						},
						todo: {
							create: jest.fn().mockResolvedValue(mockTodo),
							findMany: jest.fn().mockImplementation((args) => {
								if (args.where.ownerId === mockUser.id) {
									return [mockTodo];
								}
								return [];
							}),
						},
					},
				},
			],
		}).compile();

		service = module.get<ITodoService>(TodoService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create a todo', async () => {
		const todoPayload = {
			title: 'todo title',
			description: 'todo description',
			status: TodoStatus.OPEN,
		};
		const result = await service.createTodo(mockUser.id, todoPayload);

		expect(result).toMatchObject(todoPayload);
	});

	it('should return an array of todos', async () => {
		const id = 'id';
		const todos = await service.getTodos(id);

		expect(todos.length).toBeGreaterThan(0);
	});

	it('should not return any todo', async () => {
		const id = 'wrong_id';
		const todos = await service.getTodos(id);

		expect(todos.length).toBe(0);
	});
});
