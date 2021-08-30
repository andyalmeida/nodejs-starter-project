import { Router } from 'express';

import { AuthenticateUserController } from '../aggregates/user/controllers/AuthenticateUserController';
import { CreateUserController } from '../aggregates/user/controllers/CreateUserController';

const usersRouter = Router();

usersRouter.post('/authenticate', new AuthenticateUserController().handle);
usersRouter.post('/', new CreateUserController().handle);

export { usersRouter };
