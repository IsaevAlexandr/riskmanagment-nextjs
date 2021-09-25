import { PrismaClient } from "@prisma/client";

namespace NodeJS {
  interface Global {
    prisma: PrismaClient;
  }
}
