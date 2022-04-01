import mongoose from "mongoose";
import { name as User } from "./user";

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
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
});

export default mongoose.model(name, schema);
