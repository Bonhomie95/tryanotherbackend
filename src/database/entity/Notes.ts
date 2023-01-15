import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema(
  {
    usernoteid:{
      type: String
    },
    noteid:{
        type: String,
        default: mongoose.Types.ObjectId
    },
    title:{
       type: String,
       required: true,
  },
    note:{
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

module.exports = mongoose.model("Notes", NoteSchema);
