import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Hello to this template!' });
});

export { router };
