import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';

import { AppError } from './errors/AppError';
import { router } from './routes';
import './database';
import './container';

const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.code).json({ message: err.message });
    }

    return response.status(500).json({
        status: 'error',
        message: `Internal Server Error - ${err.message}`,
    });
});

app.listen(3333, () => console.log('Server is running!!!'));
