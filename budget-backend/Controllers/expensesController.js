const mongoose = require("mongoose");

const { Expense } = require("../Models/expense");

const addExpense = (req, res) => {

    const expense = new Expense({title: req.body.title, category: req.body.category, description: req.body.desc, amount: req.body.amount, userID: req.body.userID});
    expense.save(function (err) {
      if (err) return console.log("error saving expense");
      console.log("saved");
    });
    res.send(req.body);

  }

const getExpenses = (req, res) => {
  Expense.find({userID: req.params.id}, function (err, expenses) {
    if (err) {
      console.log("error");
      return;
    }
    console.log(req.params.id)
    res.json(expenses);
  });
}

 exports.addExpense = addExpense;
 exports.getExpenses = getExpenses;