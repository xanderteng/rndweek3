// prisma/seed.js
import pkg from '../generated/prisma/index.js';
const { PrismaClient } = pkg;
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash("admin@123", 10);

  await prisma.user.upsert({
    where: { email: "adminemail@gmail.com" },
    update: {},
    create: {
      name:        "Admin",
      email:       "adminemail@gmail.com",
      password:    hashed,
      role:        "admin",
      dateOfBirth: new Date("2000-01-10"),
    },
  });

  console.log("✅ Admin seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
