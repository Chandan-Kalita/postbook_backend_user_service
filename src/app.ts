import express, { Express, Request, Response, NextFunction } from 'express';
import userRouter from './controllers/user.controller';
import dotenv from 'dotenv';
import { z } from 'zod';
import cors from "cors"
import { listRoutes } from './utils/list_routes';
import { postsRouter } from './controllers/posts.controller';
import { usersProfileRouter } from './controllers/usersProfile.controller';
const morgan = require("morgan");
const setupRoutes = (app: Express) => {
    app.use("/api/user", userRouter);
    app.use("/api/post", postsRouter);
    app.use("/api/users", usersProfileRouter)
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
    app.use(cors({
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    }))
    app.use(express.json());
    app.use(morgan("dev"));
    setupRoutes(app);

    app.use(errorHandler);
    // listRoutes(app)
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
};