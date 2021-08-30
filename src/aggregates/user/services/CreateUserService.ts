import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../errors/AppError';
import { User } from '../entities/User';
import { IUsersRepository } from '../repositories/interfaces/IUsersRepository';
import { CreateUserRequest } from '../types/CreateUserType';

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute({ name, password, email }: CreateUserRequest): Promise<User> {
        const userExists = await this.usersRepository.findByEmail(email);
        if (userExists) {
            throw new AppError('Usuário já cadastrado!');
        }

        const passwordHash = await hash(password, 10);

        const user = await this.usersRepository.create({
            name,
            password: passwordHash,
            email,
        });

        delete user.password;

        return user;
    }
}

export { CreateUserService };
