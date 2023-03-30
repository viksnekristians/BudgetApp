require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');

const app = express();

const expensesController = require("./Controllers/expensesController");
const userController = require("./Controllers/userController");
const authController = require("./Controllers/authController");
const refreshController = require("./Controllers/refreshTokenController");
const logoutController = require("./Controllers/logoutController");

const PORT = process.env.PORT;

var corsOptions = {
  origin: process.env.FRONTEND_URI,
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

const start = async () => {
    try {
      await mongoose.connect(
        process.env.DATABASE_URI
      ).then((result) => {
          app.listen(PORT, () => console.log("Server started on port " + PORT));
      });
    } catch (error) {
      process.exit(1);
    }
  };
  
  start();

  app.post("/login", (req, res) => {
    //userController.login(req, res);
    authController.handleLogin(req,res);
  });
  app.post("/register", (req, res) => {
    userController.register(req, res);
  });
  app.post("/auth", (req,res) => {
    authController.handleLogin(req,res);
  })
  app.get("/refresh", (req,res) => {
    refreshController.handleRefreshToken(req,res);
  })

  app.get("/logout", (req,res)=>{
    logoutController.handleLogout(req,res);
  })

  app.use(verifyJWT);

  app.post("/add-expense", (req, res) => {
    expensesController.addExpense(req, res);
  });
  app.get("/expenses/:id", (req, res) => {
    expensesController.getExpenses(req, res);
  });
  app.delete("/delete-expense/:id", (req, res) => {
    expensesController.deleteExpense(req, res);
  });
