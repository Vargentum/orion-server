export default {
  me: async (parent, args, { user }) => {
    return user;
  },
};
