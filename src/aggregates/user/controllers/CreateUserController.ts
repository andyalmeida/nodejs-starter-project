import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from '../services/CreateUserService';

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, password, email } = request.body;

        const createUserService = container.resolve(CreateUserService);

        const user = await createUserService.execute({ name, password, email });

        return response.status(201).json(user);
    }
}

export { CreateUserController };
