import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// INTERFACES
import { IUserRequest } from '../interfaces/user-request.interface';

export const CurrentUser = createParamDecorator(
	(data: unknown, context: ExecutionContext): IUserRequest => {
		const ctx = GqlExecutionContext.create(context);
		return ctx.getContext().req.user as IUserRequest;
	},
);
