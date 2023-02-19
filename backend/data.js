var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from "@prisma/client";
export class DataService {
    constructor() {
        this.prisma = new PrismaClient();
    }
    getSimilarityScore(user1, user2) {
        var score = 0;
        user1.forEach((_, idx) => {
            if (user1[idx] === user2[idx]) {
                score += 1;
            }
        });
        return score;
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield this.prisma.user.findFirst({
                where: {
                    email: email,
                },
            });
            if (!userData || (userData && userData.password)) {
                return false;
            }
            return true;
        });
    }
    createPreferences(userID, prefs) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(userID, prefs);
            const preference = yield this.prisma.preference.upsert({
                where: { user_id: userID },
                update: { like_matrix: prefs },
                create: { user_id: userID, like_matrix: prefs },
            });
            return preference;
        });
    }
    generateAllMatches() {
        return __awaiter(this, void 0, void 0, function* () {
            const preferences = yield this.prisma.preference.findMany({
                select: {
                    user_id: true,
                    like_matrix: true,
                },
            });
            var matches = [];
            for (var i = 0; i < preferences.length; i++) {
                var maxIdx = i + 1;
                var maxSimilarlityScore = 0;
                for (var j = i + 1; j < preferences.length; j++) {
                    const simScore = this.getSimilarityScore(preferences[i].like_matrix, preferences[j].like_matrix);
                    if (simScore > maxSimilarlityScore) {
                        maxIdx = j;
                        maxSimilarlityScore = simScore;
                    }
                }
                matches.push({
                    match_id: i,
                    user_id: preferences[maxIdx].user_id,
                });
                matches.push({
                    match_id: i,
                    user_id: preferences[i].user_id,
                });
            }
            yield this.prisma.match.createMany({
                data: matches,
                skipDuplicates: false,
            });
        });
    }
    getMatch(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const matchData = yield this.prisma.match.findFirst({
                where: {
                    user_id: uid,
                },
            });
            const userData = yield this.prisma.match.findFirst({
                where: {
                    match_id: matchData === null || matchData === void 0 ? void 0 : matchData.match_id,
                    user_id: {
                        not: uid,
                    },
                },
            });
            const UserInfo = yield this.prisma.user.findFirst({
                where: { id: userData === null || userData === void 0 ? void 0 : userData.user_id },
            });
            return UserInfo;
        });
    }
}
const dataService = new DataService();
export { dataService };
