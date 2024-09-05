import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// RESOLVERS
import { AuthResolver } from './auth.resolver';

// PROVIDERS
import { AuthProvider } from './auth.provider';

@Global()
@Module({
	imports: [
		JwtModule.register({
			secret: process.env.SECRET,
			signOptions: {
				expiresIn: '12h',
			},
		}),
	],
	providers: AuthProvider.concat(AuthResolver),
	exports: AuthProvider.concat(AuthResolver, JwtModule),
})
export class AuthModule {}
