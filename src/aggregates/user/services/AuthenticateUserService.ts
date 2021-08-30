import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../errors/AppError';
import { IUsersRepository } from '../repositories/interfaces/IUsersRepository';
import {
    AuthenticateUserRequest,
    AuthenticateUserResponse,
} from '../types/AuthenticateUserType';

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        password,
        email,
    }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError('Dados de login inválidos!', 401);
        }

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new AppError('Dados de login inválidos!');
        }

        const token = sign({}, '8e2d16d345228c81d1251f75dcb66900', {
            subject: user.id,
            expiresIn: '1d',
        });

        return { token };
    }
}

export { AuthenticateUserService };
