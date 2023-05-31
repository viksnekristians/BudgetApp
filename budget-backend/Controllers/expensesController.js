const mongoose = require("mongoose");

const { Expense } = require("../Models/expense");

const addExpense = (req, res) => {

    const expense = new Expense({title: req.body.title, category: req.body.category, description: req.body.desc, amount: Number(req.body.amount), userID: req.body.userID});
    expense.save().then((err) => {
      if (err) return console.log("error saving expense");
    });
    res.send(expense);
  }

const getExpenses = (req, res) => {
  Expense.find({userID: req.params.id}).sort({ createdAt : -1}).then((expenses) => {
    res.json(expenses);
  },
  (error) => {
    console.error(error); // Error!
  });
}

const deleteExpense = (req, res) => {
  Expense.deleteOne({ _id: req.params.id }).then((deleted) => {
    res.status(200);
  },
  (err) => {
    console.log("error deleting");
  });
  }

 exports.addExpense = addExpense;
 exports.getExpenses = getExpenses;
 exports.deleteExpense = deleteExpense;