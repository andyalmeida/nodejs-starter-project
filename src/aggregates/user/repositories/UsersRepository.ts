import { getRepository, Repository } from 'typeorm';

import { User } from '../entities/User';
import { CreateUserRequest } from '../types/CreateUserType';
import { IUsersRepository } from './interfaces/IUsersRepository';

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({ name, email, password }: CreateUserRequest): Promise<User> {
        console.log('chegou');
        const user = this.repository.create({ name, email, password });

        console.log(user);

        await this.repository.save(user);

        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);
        return user;
    }
}

export { UsersRepository };
