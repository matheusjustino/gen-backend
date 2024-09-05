import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginDTO {
	@Field(() => String)
	public email: string;

	@Field(() => String)
	public password: string;
}
