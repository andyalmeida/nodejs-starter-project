import { Router } from 'express';

import { usersRouter } from './users.routes';

const router = Router();

router.use('/users', usersRouter);

router.get('/', (req, res) => {
    return res.json({ message: 'oi' });
});

export { router };
