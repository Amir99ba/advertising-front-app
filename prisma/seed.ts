// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const phone = '09123456789';
  const rawPassword = 'admin';

  // هش کردن رمز عبور با Salt Factor برابر 10
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  const admin = await prisma.admin.upsert({
    where: { phone },
    update: {},
    create: {
      phone,
      password: hashedPassword,
    },
  });

  console.log('ادمین اولیه با موفقیت ایجاد شد:', admin.phone);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });