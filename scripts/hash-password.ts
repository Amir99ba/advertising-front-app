import bcrypt from 'bcryptjs';

const password = process.argv[2];
if (!password || password.length < 12 || password.length > 128) {
  console.error('Usage: npm run auth:hash -- "a-strong-password-of-at-least-12-characters"');
  process.exit(1);
}

bcrypt.hash(password, 12).then((hash) => console.log(hash));
