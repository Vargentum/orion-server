import { CATEGORY_TYPES } from "../utils/constants";
import { name as User } from "./user";
import mongoose from "mongoose";

export const name = "Category";

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: Object.keys(CATEGORY_TYPES),
    required: true,
  },
  description: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
});

export default mongoose.model(name, schema);
