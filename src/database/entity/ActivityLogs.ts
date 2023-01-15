import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const activityLogs = new Schema(
  {
    title: {type: String}, 
    description: {type: String}, 
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

const ActivityLogs = mongoose.model("activityLogs", activityLogs);

module.exports = ActivityLogs;
