import mongoose from "mongoose";
import { name as Currency } from "./currency";

export const name = "Account";

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  currency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Currency,
    required: true,
  },
  transactions: {
    type: String,
    required: true,
    default: [],
  },
});

export default mongoose.model(name, schema);
