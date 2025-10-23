import bcrypt from 'bcrypt';
export async function comparePasswords(plain, hashed) {
  return bcrypt.compare(plain, hashed);
}
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}
