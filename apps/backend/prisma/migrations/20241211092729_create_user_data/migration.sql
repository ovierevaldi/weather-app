-- CreateTable
CREATE TABLE "UserData" (
    "id" INTEGER NOT NULL,
    "favourite_cities" TEXT[],

    CONSTRAINT "UserData_pkey" PRIMARY KEY ("id")
);
