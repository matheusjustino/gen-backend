import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

// INTERFACES
import { IAuthService } from './interfaces/auth-service.interface';

// SERVICES
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

jest.mock('bcryptjs', () => ({
	compare: async (pass: string, hash: string) => pass === hash,
}));

describe('AuthService', () => {
	let service: IAuthService;
	let prisma: PrismaService;
	const mockUser = {
		email: 'foo@bar.com',
		name: 'Foo Bar',
		password: 'password',
	};
	const jwtToken = 'jwt_token';

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: PrismaService,
					useValue: {
						user: {
							create: jest.fn().mockResolvedValueOnce(true),
							findFirst: jest.fn().mockResolvedValue(mockUser),
						},
					},
				},
				{
					provide: JwtService,
					useValue: {
						sign: () => jwtToken,
					},
				},
			],
		}).compile();

		service = module.get<IAuthService>(AuthService);
		prisma = module.get<PrismaService>(PrismaService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create an user', async () => {
		jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(null);
		const result = await service.register(mockUser);

		expect(result).toBeTruthy();
	});

	it('should not create an user', async () => {
		try {
			await service.register(mockUser);
		} catch (error) {
			expect(error).toEqual(
				new BadRequestException('Email already registered'),
			);
		}
	});

	it('should do login', async () => {
		const result = await service.doLogin({
			email: mockUser.email,
			password: mockUser.password,
		});

		expect(result).toBe(jwtToken);
	});

	it('should throw an invalid credentials error', async () => {
		try {
			await service.doLogin({
				email: mockUser.email,
				password: 'wrongpassword',
			});
		} catch (error) {
			expect(error).toEqual(
				new BadRequestException('Invalid Credentials'),
			);
		}
	});
});
