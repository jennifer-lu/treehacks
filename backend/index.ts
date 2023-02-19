import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { dataService } from "./data.js";

const prisma = new PrismaClient();

const app: Express = express();
// app.all("/*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/hi", (req: Request, res: Response) => {
  res.json("Hello World");
});

// create user
app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("the email", email, password);
  try {
    const user = await prisma.user.findFirst({
      where: { email: email },
      select: { id: true, password: true },
    });

    if (user?.password !== password) {
      console.log("the user", user, password);
      return res.status(401).json({ error: "Invalid Password" });
    }
    res.json({ userId: user?.id });
  } catch (e) {
    res
      .status(500)
      .json({ error: `User with email ${email} does not exist in database` });
  }
});

app.post("/signup", async (req: Request, res: Response) => {
  console.log("hit signup");
  const { email, password } = req.body;
  const result = await prisma.user.create({
    data: {
      email,
      password,
    },
  });
  res.json(result);
});

app.post("/newProfile", async (req: Request, res: Response) => {
  const { userID, name, dietary_restrictions } = req.body;
  const result = await prisma.user.update({
    where: { id: userID },
    data: {
      name,
      dietary_restrictions,
    },
  });
  res.json(result);
});

app.post("/createPreference", cors({}), async (req: Request, res: Response) => {
  console.log("endpoint hit");
  const { userID, prefs } = req.body;
  const post = await dataService.createPreferences(userID, prefs);
  dataService.generateAllMatches();
  console.log(post);
  res.json(post);
});

app.get("/getMatch", async (req: Request, res: Response) => {
  const { userID } = req.body;
  const match = dataService.getMatch(userID);
  res.json(match);
});

app.listen({ port: 5050 }, () => {
  /* eslint-disable-next-line no-console */
  console.info(`Server is listening on port 5050}!`);
});
