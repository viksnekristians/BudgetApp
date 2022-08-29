const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  amount: {
    type: Number,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  createdAt: {
    type:Date,
    immutable: true,
    default: () => Date.now()
  },
  updatedAt: {
    type:Date,
    default: () => Date.now()
  }
});

const Expense = mongoose.model("Expense", ExpenseSchema);

module.exports = { Expense };