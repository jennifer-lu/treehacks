-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "dietary_restrictions" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preference" (
    "user_id" INTEGER NOT NULL,
    "kebab" BOOLEAN NOT NULL,
    "ramen" BOOLEAN NOT NULL,
    "olives" BOOLEAN NOT NULL,
    "salad" BOOLEAN NOT NULL,
    "curry" BOOLEAN NOT NULL,
    "shawarma" BOOLEAN NOT NULL,
    "sushi" BOOLEAN NOT NULL,
    "fish_n_chips" BOOLEAN NOT NULL,
    "poutine" BOOLEAN NOT NULL,
    "beer" BOOLEAN NOT NULL,

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Match" (
    "match_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("match_id")
);
