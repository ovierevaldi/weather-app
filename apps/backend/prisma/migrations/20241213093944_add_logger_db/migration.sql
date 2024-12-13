-- CreateTable
CREATE TABLE "Logger" (
    "id" SERIAL NOT NULL,
    "code" INTEGER NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Logger_pkey" PRIMARY KEY ("id")
);
