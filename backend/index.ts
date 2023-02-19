import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { dataService } from "./data.js";

const prisma = new PrismaClient();
const CORS_ALLOW_LIST = ["http://localhost:3000"];

const CORS_OPTIONS = {
  origin: CORS_ALLOW_LIST,
  credentials: true,
};

const app: Express = express();
app.use(cookieParser());
app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/hi", (req: Request, res: Response) => {
  res.json("Hello World");
});

// create user
app.get("/login", async (req: Request, res: Response) => {
  const { mail, password } = req.params;
  console.log("hit login", req.params);
  try {
    const user = await prisma.user.findFirst({
      where: { email: mail },
      select: { id: true, password: true },
    });

    if (user?.password !== password) {
      return res.status(401).json({ error: "Invalid Password" });
    }
    res.json({ userId: user?.id });
  } catch (e) {
    res
      .status(500)
      .json({ error: `User with email ${mail} does not exist in database` });
  }
});

app.post("/signup", async (req: Request, res: Response) => {
  const { id, name, email, password, dietary_restrictions } = req.body;
  const result = await prisma.user.create({
    data: {
      id,
      name,
      email,
      password,
      dietary_restrictions,
    },
  });
  res.json(result);
});

app.post("/createPreference", async (req: Request, res: Response) => {
  console.log("endpoint hit");
  const { userID, prefs } = req.body;
  const post = await dataService.createPreferences(userID, prefs);
  console.log(post);
  res.json(post);
});

app.get("/getMatch", async (req: Request, res: Response) => {
  const { userID } = req.body;
  const match = dataService.getMatch(userID);
});

app.listen({ port: 5050 }, () => {
  /* eslint-disable-next-line no-console */
  console.info(`Server is listening on port 5050}!`);
});
