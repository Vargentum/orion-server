import mongoose from "mongoose";
import { TRANSACTION_TYPES } from "../utils/constants";
import { name as User } from "./user";

export const name = "Transaction";

export const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.keys(TRANSACTION_TYPES),
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(name, schema);
