
export function getUserFromRequest(req) {
  const token =
    req.cookies?.token ||
    req.headers?.authorization?.split(" ")[1] ||
    null;

  if (!token) return null;

  const decoded = verifyToken(token);
  return decoded ? decoded : null;
}