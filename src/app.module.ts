import { ApolloDriver } from '@nestjs/apollo';
import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

// RESOLVERS
import { AppResolver } from './app.resolver';

// MODULES
import { AppConfigModule } from './modules/app-config/app-config.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { TodoModule } from './modules/todo/todo.module';

@Module({
	imports: [
		GraphQLModule.forRoot({
			driver: ApolloDriver,
			autoSchemaFile: true,
			sortSchema: true,
			cors: {
				credentials: true,
			},
			debug: true,
			playground: false,
			context: ({ req }) => ({ headers: req.headers }),
			formatError: (error) => {
				Logger.error(JSON.stringify(error));

				const graphQLFormattedError = {
					message:
						error?.extensions?.exception?.detail ||
						error?.extensions?.exception?.response?.message ||
						error?.message,
					code: error?.extensions?.code,
				};
				return graphQLFormattedError;
			},
		}),
		AppConfigModule,
		PrismaModule,
		AuthModule,
		TodoModule,
	],
	providers: [AppResolver],
})
export class AppModule {}
