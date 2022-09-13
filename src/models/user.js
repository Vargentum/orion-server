import mongoose from "mongoose";

export const name = "User";

const schema = mongoose.Schema({
  avatar: String,
  name: {
    type: String,
    default: "Stranger",
  },
  email: {
    type: String,
    required: true,
    immutable: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model(name, schema);
