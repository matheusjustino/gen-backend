import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

// ENUMS
import { AuthProviderEnum } from './enums/auth-provider.enum';

// INTERFACES
import { IAuthService } from './interfaces/auth-service.interface';

// DTOS
import { CreateUserDTO } from './dtos/create-user.dto';
import { LoginDTO } from './dtos/login.dto';

@Resolver()
export class AuthResolver {
	constructor(
		@Inject(AuthProviderEnum.AUTH_SERVICE)
		private readonly authService: IAuthService,
	) {}

	@Mutation(() => Boolean)
	public async register(@Args('input') input: CreateUserDTO) {
		return this.authService.register(input);
	}

	@Mutation(() => String)
	public async doLogin(@Args('input') input: LoginDTO) {
		return this.authService.doLogin(input);
	}
}
