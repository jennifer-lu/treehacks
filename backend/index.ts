import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
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

// create user
app.get('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, password: true },
    });

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid Password' });
    }
    res.json({ userId: user.id });
  } catch (e) {
    res
      .status(500)
      .json({ error: `User with email ${email} does not exist in database` });
  }
});

//
app.post('/signup', async (req: Request, res: Response) => {
  
});
app.app.listen({ port: 5000 }, () => {
  /* eslint-disable-next-line no-console */
  console.info(`Server is listening on port 5000}!`);
});
