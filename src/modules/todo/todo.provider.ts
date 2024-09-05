import { Provider } from '@nestjs/common';

// ENUMS
import { TodoProviderEnum } from './enums/todo-provider.enum';

// SERVICES
import { TodoService } from './todo.service';

export const TodoProvider: Provider[] = [
	{
		provide: TodoProviderEnum.TODO_SERVICE,
		useClass: TodoService,
	},
];
