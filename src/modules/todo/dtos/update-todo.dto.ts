import { Field, InputType } from '@nestjs/graphql';
import { TodoStatus } from '@prisma/client';

@InputType()
export class UpdateTodoDTO {
	@Field(() => String)
	public id: string;

	@Field(() => String, { nullable: true })
	public title?: string;

	@Field(() => String, { nullable: true })
	public description?: string;

	@Field(() => TodoStatus, { nullable: true })
	public status?: TodoStatus;
}
