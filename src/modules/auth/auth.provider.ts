import { Provider } from '@nestjs/common';

// ENUMS
import { AuthProviderEnum } from './enums/auth-provider.enum';

// GUARDS
import { GqlJWTGuard } from './guards/gql-jwt.guard';

// SERVICES
import { AuthService } from './auth.service';

export const AuthProvider: Provider[] = [
	{
		provide: AuthProviderEnum.AUTH_SERVICE,
		useClass: AuthService,
	},
	{
		provide: AuthProviderEnum.GQL_JWT_GUARD,
		useClass: GqlJWTGuard,
	},
];
