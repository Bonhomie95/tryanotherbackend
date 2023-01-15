import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    text: {
      type: String,
    },
    files: {
      type: Array,
    },
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
    reactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reactions",
      },
    ],
  },
  { timestamps: true }
);

const Comments = mongoose.model("comments", commentSchema);

module.exports = Comments;