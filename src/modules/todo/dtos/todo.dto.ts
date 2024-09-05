import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

// ENUMS
import { TodoStatus } from '@prisma/client';

registerEnumType(TodoStatus, { name: 'TodoStatus' });

@ObjectType()
export class TodoDTO {
	@Field(() => ID)
	public id: string;

	@Field(() => String)
	public title: string;

	@Field(() => String)
	public description: string;

	@Field(() => TodoStatus)
	public status: TodoStatus;

	@Field(() => String)
	public ownerId: string;
}
