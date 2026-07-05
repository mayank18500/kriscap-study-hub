const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log("Users in DB:");
  users.forEach(u => {
    console.log(`- ID: ${u.id}, Name: ${u.name}, Email: ${u.email}, ClerkID: ${u.clerkId}, Role: ${u.role}`);
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
