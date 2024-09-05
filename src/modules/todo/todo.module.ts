import { Module } from '@nestjs/common';

// RESOLVERS
import { TodoResolver } from './todo.resolver';

// PROVIDERS
import { TodoProvider } from './todo.provider';

@Module({
	providers: TodoProvider.concat(TodoResolver),
})
export class TodoModule {}
