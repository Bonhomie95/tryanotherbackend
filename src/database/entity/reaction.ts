import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const reactionsSchema = new Schema(
  {
    reaction: { type: String },
    user: {
      id: String,
      email: String,
      firstName: String,
      lastName: String,
      userType: String,
      role: String,
      isVerified: String,
      isActive: String,
    },
  },
  { timestamps: true }
);

const Reactions = mongoose.model("reactions", reactionsSchema);

module.exports = Reactions;
