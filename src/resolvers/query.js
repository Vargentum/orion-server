// import { AuthenticationError, ForbiddenError } from "apollo-server-express";

export default {
  me: async (parent, args, { user }) => {
    return user;
  },

  accounts: async (parent, args, { models, user }) => {
    return await models.Account.find({ author: user._id });
  },

  account: async (parent, { id }, { models, user }) => {
    return await models.Account.findOne({ _id: id, author: user._id });
  },

  categories: async (parent, args, { models, user }) => {
    return await models.Category.find({ user: user._id });
  },

  category: async (parent, { id }, { models, user }) => {
    return await models.Category.findOne({ _id: id, author: user._id });
  },

  transactions: async (parent, args, { models, user }) => {
    return await models.Transaction.find({ author: user._id });
  },

  transaction: async (parent, { id }, { models, user }) => {
    return await models.Transaction.findOne({ _id: id, author: user._id });
  },
};
