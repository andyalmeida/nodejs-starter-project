import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { container } from 'tsyringe';

import { UsersRepository } from '../aggregates/user/repositories/UsersRepository';
import { AppError } from '../errors/AppError';

type TokenPayload = {
    sub: string;
};

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('Token não enviado!', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const { sub: user_id } = verify(
            token,
            '8e2d16d345228c81d1251f75dcb66900'
        ) as TokenPayload;

        const usersRepository = container.resolve(UsersRepository);
        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('Token inválido!', 401);
        }

        request.user = {
            id: user_id,
        };

        next();
    } catch {
        throw new AppError('Token inválido!', 401);
    }
}
