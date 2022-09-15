import { name as Account } from "./account";
import { name as Category } from "./category";
import { TRANSACTION_TYPES } from "../utils/constants";
import { name as User } from "./user";
import mongoose from "mongoose";

export const name = "Transaction";

export const schema = mongoose.Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Account,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Category,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    fromAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Account,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.keys(TRANSACTION_TYPES),
      required: true,
    },
  },
  {
    // timestamps: true,
  }
);

export default mongoose.model(name, schema);
