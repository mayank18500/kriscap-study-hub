const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  try {
    const faqs = await prisma.fAQ.findMany();
    console.log("FAQs in DB:", faqs);
  } catch (err) {
    console.error("Prisma query failed:", err.message);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
