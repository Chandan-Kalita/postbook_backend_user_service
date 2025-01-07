import express, { Express, Request, Response, NextFunction } from 'express';
import userController from './controllers/user.controller';
import dotenv from 'dotenv';
import { z } from 'zod';

const setupRoutes = (app: Express) => {
    app.use("/user", userController);
};

const validateEnv = () => {
    const envSchema = z.object({
        PORT: z.string().optional(),
        DATABASE_URL: z.string().url(),
    });

    envSchema.parse(process.env);
};

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error({ time: new Date().toLocaleString(), err, body: req.body });
    res.status(err.status || 500).send({ error: err.message || 'Internal Server Error' });
};

export const bootstrap = () => {
    dotenv.config();
    validateEnv();

    const app: Express = express();
    const port = process.env.PORT || 3000;

    app.use(express.json());

    setupRoutes(app);

    app.use(errorHandler);

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
};