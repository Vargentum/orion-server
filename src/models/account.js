import mongoose from "mongoose";

export const name = "Account";

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  transactions: {
    type: String,
    required: true,
    default: [],
  },
});

export default mongoose.model(name, schema);
