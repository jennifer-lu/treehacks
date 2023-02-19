var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { PrismaClient } from "@prisma/client";
import { dataService } from "./data.js";
const prisma = new PrismaClient();
const app = express();
// app.all("/*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/hi", (req, res) => {
    res.json("Hello World");
});
// create user
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log("the email", email, password);
    try {
        const user = yield prisma.user.findFirst({
            where: { email: email },
            select: { id: true, password: true },
        });
        if ((user === null || user === void 0 ? void 0 : user.password) !== password) {
            console.log("the user", user, password);
            return res.status(401).json({ error: "Invalid Password" });
        }
        res.json({ userId: user === null || user === void 0 ? void 0 : user.id });
    }
    catch (e) {
        res
            .status(500)
            .json({ error: `User with email ${email} does not exist in database` });
    }
}));
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hit signup");
    const { email, password } = req.body;
    const result = yield prisma.user.create({
        data: {
            email,
            password,
        },
    });
    res.json(result);
}));
app.post("/newProfile", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID, name, dietary_restrictions } = req.body;
    const result = yield prisma.user.update({
        where: { id: userID },
        data: {
            name,
            dietary_restrictions,
        },
    });
    res.json(result);
}));
app.post("/createPreference", cors({}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("endpoint hit");
    const { userID, prefs } = req.body;
    const post = yield dataService.createPreferences(userID, prefs);
    dataService.generateAllMatches();
    console.log(post);
    res.json(post);
}));
app.get("/getMatch", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.body;
    const match = dataService.getMatch(userID);
    res.json(match);
}));
app.listen({ port: 5050 }, () => {
    /* eslint-disable-next-line no-console */
    console.info(`Server is listening on port 5050}!`);
});
