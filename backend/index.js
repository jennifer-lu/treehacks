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
const CORS_ALLOW_LIST = ["http://localhost:3000"];
const CORS_OPTIONS = {
    origin: CORS_ALLOW_LIST,
    credentials: true,
};
const app = express();
app.use(cookieParser());
app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/hi", (req, res) => {
    res.json("Hello World");
});
// create user
app.get("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mail, password } = req.params;
    console.log("hit login", req.params);
    try {
        const user = yield prisma.user.findFirst({
            where: { email: mail },
            select: { id: true, password: true },
        });
        if ((user === null || user === void 0 ? void 0 : user.password) !== password) {
            return res.status(401).json({ error: "Invalid Password" });
        }
        res.json({ userId: user === null || user === void 0 ? void 0 : user.id });
    }
    catch (e) {
        res
            .status(500)
            .json({ error: `User with email ${mail} does not exist in database` });
    }
}));
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, email, password, dietary_restrictions } = req.body;
    const result = yield prisma.user.create({
        data: {
            id,
            name,
            email,
            password,
            dietary_restrictions,
        },
    });
    res.json(result);
}));
app.post("/createPreference", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("endpoint hit");
    const { userID, prefs } = req.body;
    const post = yield dataService.createPreferences(userID, prefs);
    console.log(post);
    res.json(post);
}));
app.get("/getMatch", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.body;
    const match = dataService.getMatch(userID);
}));
app.listen({ port: 5050 }, () => {
    /* eslint-disable-next-line no-console */
    console.info(`Server is listening on port 5050}!`);
});
