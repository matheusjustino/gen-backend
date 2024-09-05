import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { TodoStatus } from '@prisma/client';

registerEnumType(TodoStatus, { name: 'TodoStatus' });

@InputType()
export class CreateTodoDTO {
	@Field(() => String)
	public title: string;

	@Field(() => String)
	public description: string;

	@Field(() => TodoStatus)
	public status: TodoStatus;
}
