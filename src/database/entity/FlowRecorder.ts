import mongoose from 'mongoose';

const FlowRecorderSchema = new mongoose.Schema(
  {
    userrecordid:{
      type: String
    },
    recordid:{
      type: String,
      default: mongoose.Types.ObjectId
    },
    name:{
       type: String,
  },
    record:{
       type: String,
  },
   
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FlowRecorder", FlowRecorderSchema);
