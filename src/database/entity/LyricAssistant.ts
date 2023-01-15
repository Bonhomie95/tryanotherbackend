import mongoose from 'mongoose';

const LyricAssistantSchema = new mongoose.Schema(
  {
    userlyricid:{
      type: String
    },
    lyricid:{
      type: String,
      default: mongoose.Types.ObjectId
    },
    type:{
       type: String,
       required: true,
  },
    lyrics:{
       type: String,
       required: true,
  },
   
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LyricAssistant", LyricAssistantSchema);
