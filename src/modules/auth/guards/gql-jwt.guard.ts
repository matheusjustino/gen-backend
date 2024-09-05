import {
	ExecutionContext,
	ForbiddenException,
	Injectable,
	Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

// INTERFACES
import { IUserRequest } from '../interfaces/user-request.interface';

@Injectable()
export class GqlJWTGuard extends AuthGuard('jwt') {
	private readonly logger: Logger = new Logger(GqlJWTGuard.name);

	constructor(private readonly jwtService: JwtService) {
		super();
	}

	public canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		this.logger.log('canActivate');

		const gqlCtx = GqlExecutionContext.create(context);
		const ctx = gqlCtx.getContext();

		if (!ctx.headers.authorization) {
			this.logger.error('No authorization header');
			throw new ForbiddenException('Invalid Token');
		}

		const [, token]: [string, string] =
			ctx.headers.authorization.split(' ');

		if (!token) {
			this.logger.error('No token provide');
			throw new ForbiddenException('Invalid Token');
		}

		try {
			const payload = this.validateToken(token);
			ctx.req.user = payload;
		} catch (error) {
			this.logger.error(error);
			throw new ForbiddenException('Expired Token');
		}

		return true;
	}

	private validateToken(token: string): IUserRequest {
		this.logger.log('validateToken');

		const verifiedToken = this.jwtService.verify(token, {
			secret: process.env.SECRET,
		}) as IUserRequest;

		return {
			id: verifiedToken.id,
			email: verifiedToken.email,
		};
	}
}
