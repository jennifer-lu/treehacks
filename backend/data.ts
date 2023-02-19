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

  private getSimilarityScore(): number {
      
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
    return await this.prisma.preference.upsert({
      where: { user_id: userID },
      update: { like_matrix: prefs },
      create: { user_id: userID, like_matrix: prefs },
    });
  }

  async generateAllMatches() {
    const preferences = await this.prisma.preference.findMany({
      select: {
        user_id: true,
        like_matrix: true,
      },
    });

    var matches = []

    for (var i = 0; i < preferences.length; i++) {
        var maxIdx = i + 1
        for (var j = i + 1; j < preferences.length; j++) {
            if preferences[maxIdx].like_matrix.
        }
    }

  }


}
