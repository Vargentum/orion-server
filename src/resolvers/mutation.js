import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  AuthenticationError /* ForbiddenError */,
} from "apollo-server-express";
import gravatar from "gravatar";

const SALT_ROUNDS = 10;
const { JWT_SECRET } = process.env;

export default {
  signUp: async (parent, { email, password, name }, { models }) => {
    const avatar = await gravatar.url(email);
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);

    try {
      const user = await models.User.create({
        avatar,
        email,
        name,
        password: hashed,
      });
      const userToken = await jwt.sign({ id: user._id }, JWT_SECRET);
      return userToken;
    } catch (e) {
      console.log(e);
      throw new Error("Cannot sign you up!");
    }
  },

  signIn: async (parent, { email, password }, { models }) => {
    const user = await models.User.findOne({ email });
    if (!user) {
      throw new AuthenticationError("Invalid credentials");
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      throw new AuthenticationError("Invalid credentials");
    }

    const userToken = await jwt.sign({ id: user._id }, JWT_SECRET);
    return userToken;
  },
};
