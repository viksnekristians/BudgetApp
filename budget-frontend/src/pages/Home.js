
import { useState, useContext, useEffect } from 'react';
import Login from '../components/Login'
import AddExpense from '../components/AddExpense'
import AllExpenses from '../components/AllExpenses'
import {UserContext} from '../UserContext'
import {ExpensesContext} from '../ExpensesContext'

function Home() {
  const {user, setUser} = useContext(UserContext)
  const {expenses, setExpenses} = useContext(ExpensesContext)
  const categories = expenses.map(expense => expense.category)

  useEffect(() => console.log(expenses), [expenses])

  function getExpensesThisMonth() {
    return expenses.reduce((total, expense) => {
      if (!isNaN(Date.parse(expense.createdAt))) {
        if (new Date(expense.createdAt).getMonth() === new Date().getMonth()) return total+ expense.amount;
      } 
      return total;
    }, 0)}
  
  const getExpensesInPeriod = (days) => {
    return expenses.reduce((total, expense) => {
      if (!isNaN(Date.parse(expense.createdAt))) {
        if ((new Date() - new Date(expense.createdAt)) / 1000 / 60 / 60 /24 < days) return total+ expense.amount;
      } 
      return total;
    }, 0)
  }


  return (
    <div className="container-sm pt-4">
      <h3>Hello, {user.firstname} {user.lastname}</h3>
      <p>Your expenses last 7 days: <span style={{fontSize: "24px"}}><b>{getExpensesInPeriod(7).toFixed(2)} €</b></span></p>
      <p>Your expenses this calendar month: <span style={{fontSize: "24px"}}><b>{getExpensesThisMonth().toFixed(2)} €</b></span></p>
      <p>Your expenses last 30 days: <span style={{fontSize: "24px"}}><b>{getExpensesInPeriod(30).toFixed(2)} €</b></span></p>
    </div>
  );
}

export default Home;