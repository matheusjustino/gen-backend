import { ExecutionContext } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

// GUARDS
import { GqlJWTGuard } from './gql-jwt.guard';

describe('GqlJWTGuard', () => {
	let guard: GqlJWTGuard;
	let jwtService: JwtService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				GqlJWTGuard,
				{
					provide: JwtService,
					useValue: {
						verify: jest.fn(),
					},
				},
			],
		}).compile();

		guard = module.get<GqlJWTGuard>(GqlJWTGuard);
		jwtService = module.get<JwtService>(JwtService);
	});

	it('should canActivate run successfully', async () => {
		const payload = { id: '123', email: 'test@example.com' };
		jest.spyOn(jwtService, 'verify').mockReturnValue(payload);

		jest.spyOn(GqlExecutionContext, 'create').mockReturnValue({
			getContext: () => ({
				headers: {
					authorization: 'Bearer validToken',
				},
				req: {
					user: {},
				},
			}),
		} as GqlExecutionContext);

		const context = {
			getType: () => 'graphql',
		};

		expect(await guard.canActivate(context as ExecutionContext)).toBe(true);
	});

	it('should thrown an error without authorization header', async () => {
		try {
			jest.spyOn(GqlExecutionContext, 'create').mockReturnValue({
				getContext: () => ({
					headers: {},
					req: {
						user: {},
					},
				}),
			} as GqlExecutionContext);

			const context = {
				getType: () => 'graphql',
			};

			await guard.canActivate(context as ExecutionContext);
		} catch (error) {
			expect(error).toEqual(new ForbiddenException('Invalid Token'));
		}
	});

	it('should thrown an error without valid authorization header', async () => {
		try {
			jest.spyOn(GqlExecutionContext, 'create').mockReturnValue({
				getContext: () => ({
					headers: {
						authorization: 'Bearer',
					},
					req: {
						user: {},
					},
				}),
			} as GqlExecutionContext);

			const context = {
				getType: () => 'graphql',
			};

			await guard.canActivate(context as ExecutionContext);
		} catch (error) {
			expect(error).toEqual(new ForbiddenException('Invalid Token'));
		}
	});

	it('should canActivate run successfully', async () => {
		try {
			jest.spyOn(jwtService, 'verify').mockImplementation(() => {
				throw new Error('Expired Token');
			});

			jest.spyOn(GqlExecutionContext, 'create').mockReturnValue({
				getContext: () => ({
					headers: {
						authorization: 'Bearer expiredToken',
					},
					req: {
						user: {},
					},
				}),
			} as GqlExecutionContext);

			const context = {
				getType: () => 'graphql',
			};

			await guard.canActivate(context as ExecutionContext);
		} catch (error) {
			expect(error).toEqual(new ForbiddenException('Expired Token'));
		}
	});
});
