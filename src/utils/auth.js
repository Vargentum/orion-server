import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;
const { JWT_SECRET } = process.env;

export const auth = {
  generateHash: (password) => bcrypt.hash(password, SALT_ROUNDS),

  compareWithHash: (password, hash) => bcrypt.compare(password, hash),

  generateToken: (id) => jwt.sign({ id }, JWT_SECRET),

  verifyToken: (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (e) {
      throw new Error("Can't verify JWT token");
    }
  },
};
