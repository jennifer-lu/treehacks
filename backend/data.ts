import { PrismaClient, Prisma } from '@prisma/client';

class DataService {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  constructor() {
    this.prisma = new PrismaClient();
  }

  private getSimilarityScore(user1: number[], user2: number[]): number {
    var score = 0;
    user1.forEach((_, idx) => {
      if (user1[idx] === user2[idx]) {
        score += 1;
      }
    });
    return score;
  }

  async loginUser(email: string, password: string): Promise<Boolean> {
    const userData = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!userData || (userData && userData.password)) {
      return false;
    }

    return true;
  }

  async createPreferences(userID: number, prefs: [number]) {
    console.log(userID, prefs);
    const preference = await this.prisma.preference.upsert({
      where: { user_id: userID },
      update: { like_matrix: prefs },
      create: { user_id: userID, like_matrix: prefs },
    })
    return preference;
  }

  async generateAllMatches() {
    const preferences = await this.prisma.preference.findMany({
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
        const simScore = this.getSimilarityScore(
          preferences[i].like_matrix,
          preferences[j].like_matrix,
        );
        if (simScore > maxSimilarlityScore) {
          maxIdx = j;
          maxSimilarlityScore = simScore;
        }
      }

      matches.push([preferences[i].user_id, preferences[maxIdx].user_id]);
    }

    // await this.prisma.match.createMany({
    //     data: 
    // })

  }

  async getMatch(uid: number) {
    const matchData = await this.prisma.match.findFirst({
      where: {
        user_id: uid,
      },
    });

    const userData = await this.prisma.match.findFirst({
      where: {
        match_id: matchData?.match_id,
        user_id: {
          not: uid,
        }
      },
    })
  }
}

const dataService: DataService = new DataService();
export { dataService };