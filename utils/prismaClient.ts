import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prismaClient = new PrismaClient();
  // TODO: если останется время, то разобраться с ошибкой, почему не добавляются кастомные типы в global
} else {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient();
  }
  // @ts-ignore
  prismaClient = global.prisma;
}
export { prismaClient };
