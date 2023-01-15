import mongoose from 'mongoose';

const CaveSchema = new mongoose.Schema(
  {
    fileid:{
         type: String,
    },
    foldername:{
       type: String,
  },
    uploads: [
      {
      originalname: {type: String},
      version: {
        type: String
      },
      size: {type: String}
    }
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cave", CaveSchema);
