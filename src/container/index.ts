import { container } from 'tsyringe';

import { IUsersRepository } from '../aggregates/user/repositories/interfaces/IUsersRepository';
import { UsersRepository } from '../aggregates/user/repositories/UsersRepository';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
);
