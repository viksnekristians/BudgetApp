require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors');

const app = express();

const expensesController = require("./Controllers/expensesController");

const PORT = process.env.PORT;

var corsOptions = {
  origin: process.env.FRONTEND_URI,
  optionsSuccessStatus: 200 
}

app.use(express.json());
app.use(cors(corsOptions));

const start = async () => {
    try {
      await mongoose.connect(
        process.env.DATABASE_URI
      ).then((result) => {
          app.listen(PORT, () => console.log("Server started on port " + PORT));
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  start();

  app.post("/add-expense", (req, res) => {
    expensesController.addExpense(req, res);
  });
  app.get("/expenses", (req, res) => {
    expensesController.getExpenses(req, res);
});
