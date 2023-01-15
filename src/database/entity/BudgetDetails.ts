import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const budgetDetails = new Schema(
  {
    title: {type: String}, 
    description: {type: String}, 
    budget: {
        type: Number, 
    },
    spentBudget:{
        type:Number
    },
    availableBudget:{
      type:Number
    },
    project:{
        id: String, 
        name: String,
        description: String, 
        artistName: String, 
        projectType: String, 
    },
    user: {
      id: String,
      email: String,
      firstName: String,
      lastName: String,
      
    },
  },
  { timestamps: true }
);

const BudgetDetails = mongoose.model("budgetDetails", budgetDetails);

module.exports = BudgetDetails;
