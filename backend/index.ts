import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';

const CORS_ALLOW_LIST = ['http://localhost:3000'];

const CORS_OPTIONS = {
  origin: CORS_ALLOW_LIST,
  credentials: true,
};

const app: Express = express();
app.use(cookieParser());
app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/hi', (req: Request, res: Response) => {
  res.json('Hello World');
});

app.listen({ port: 5000 }, () => {
  /* eslint-disable-next-line no-console */
  console.info(`Server is listening on port 5000}!`);
});