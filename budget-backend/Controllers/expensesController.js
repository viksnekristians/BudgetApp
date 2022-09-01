const mongoose = require("mongoose");

const { Expense } = require("../Models/expense");

const addExpense = (req, res) => {

    const expense = new Expense({title: req.body.title, category: req.body.category, description: req.body.desc, amount: Number(req.body.amount), userID: req.body.userID});
    expense.save(function (err) {
      if (err) return console.log("error saving expense");
    });
    res.send(expense);

  }

const getExpenses = (req, res) => {
  Expense.find({userID: req.params.id}, function (err, expenses) {
    if (err) {
      console.log("error");
      return;
    }
    console.log(req.params.id)
    console.log(expenses)
    res.json(expenses);
  }).sort({createdAt: 'desc'});
}

const deleteExpense = (req, res) => {
  Expense.deleteOne({ _id: req.params.id }, function (err) {
    if (err) console.log("error deleting")
    // deleted at most one tank document
  });
  }

 exports.addExpense = addExpense;
 exports.getExpenses = getExpenses;
 exports.deleteExpense = deleteExpense;