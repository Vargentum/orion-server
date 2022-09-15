import { AuthenticationError } from "apollo-server-express";
import { auth } from "../utils";
import gravatar from "gravatar";

export default {
  signUp: async (parent, { email, password, name }, { models }) => {
    const avatar = await gravatar.url(email);
    const hashedPassword = await auth.generateHash(password);

    try {
      const user = await models.User.create({
        avatar,
        email,
        name,
        password: hashedPassword,
      });
      return auth.generateToken(user._id);
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

    const passwordsMatch = await auth.compareWithHash(password, user.password);
    if (!passwordsMatch) {
      throw new AuthenticationError("Invalid credentials");
    }

    return auth.generateToken(user._id);
  },

  createAccount: async (
    parent,
    { name, currency, amount, description },
    { models, user }
  ) => {
    return await models.Account.create({
      amount,
      author: user._id,
      currency,
      description,
      name,
    });
  },
  deleteAccount: async (parent, { id }, { models, user }) => {
    return await models.Account.findOneAndDelete({ _id: id, author: user._id });
  },
  updateAccount: async (
    parent,
    { id, name, currency, amount, transactions, description },
    { models, user }
  ) => {
    return await models.Account.findOneAndUpdate(
      { _id: id, author: user._id },
      {
        amount,
        currency,
        description,
        name,
        transactions,
      }
    );
  },

  createCategory: async (
    parent,
    { name, description, type },
    { models, user }
  ) => {
    return await models.Category.create({
      author: user._id,
      description,
      name,
      type,
    });
  },
  deleteCategory: async (parent, { id }, { models, user }) => {
    return await models.Category.findOneAndDelete({
      _id: id,
      author: user._id,
    });
  },
  updateCategory: async (
    parent,
    { id, name, description, type },
    { models, user }
  ) => {
    return await models.Category.findOneAndUpdate(
      { _id: id, author: user._id },
      {
        description,
        name,
        type,
      }
    );
  },

  createTransaction: async (
    parent,
    { type, amount, date, description, account, category },
    { models, user }
  ) => {
    return await models.Transaction.create({
      account,
      amount,
      author: user._id,
      category,
      date,
      description,
      type,
    });
  },
  deleteTransaction: async (parent, { id }, { models, user }) => {
    return await models.Transaction.findOneAndDelete({
      _id: id,
      author: user._id,
    });
  },
  updateTransaction: async (
    parent,
    { id, type, amount, date, description, account, category },
    { models, user }
  ) => {
    return await models.Transaction.findOneAndUpdate(
      { _id: id, author: user._id },
      {
        account,
        amount,
        category,
        date,
        description,
        type,
      }
    );
  },
};
