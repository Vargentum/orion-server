import { name as User } from "./user";
import mongoose from "mongoose";

export const name = "Account";

const schema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  amount: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model(name, schema);
