import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const postSchema = new Schema(
  {
    files: { type: Array },
    description: {
      type: String,
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
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        text: String,
        files: {
          type: Array,
        },
        ref: "comments",
      },
    ],
    reactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reactions",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;
