// DTOS
import { CreateUserDTO } from '../dtos/create-user.dto';
import { LoginDTO } from '../dtos/login.dto';

export interface IAuthService {
	register(data: CreateUserDTO): Promise<boolean>;
	doLogin(data: LoginDTO): Promise<string>;
}
