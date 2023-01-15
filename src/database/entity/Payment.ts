import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const paymentSchema = new Schema(
  {
    subscriptionPlan: {
      type: String,
    },
    paymentId:{type:String},
    amount:{type: Number},
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

    expiresIn: {
      type: Date
    }
   
  },
  { timestamps: true }
);

const Payment = mongoose.model("payment", paymentSchema);

module.exports = Payment;
