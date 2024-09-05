import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
	@Query(() => String)
	public checkApp() {
		return 'Server is running!';
	}
}
