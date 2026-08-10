import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

async function main() {
  const [, , phone, password] = process.argv;
  if (!phone || !/^09\d{9}$/.test(phone) || !password || password.length < 12 || password.length > 128) {
    throw new Error('Usage: npm run auth:create-admin -- 09123456789 "a-strong-password-of-at-least-12-characters"');
  }

  const prisma = new PrismaClient();
  try {
    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.admin.upsert({
      where: { phone },
      update: { password: passwordHash, failedLoginAttempts: 0, lockedUntil: null },
      create: { phone, password: passwordHash },
    });
    console.log(`Admin ${phone} was created or updated securely.`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : 'Could not create admin.');
  process.exitCode = 1;
});
