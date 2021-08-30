import { User } from '../../entities/User';
import { CreateUserRequest } from '../../types/CreateUserType';

interface IUsersRepository {
    create(data: CreateUserRequest): Promise<User>;

    findByEmail(email: string): Promise<User>;

    findById(id: string): Promise<User>;
}

export { IUsersRepository };
