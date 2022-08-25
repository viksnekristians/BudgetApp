
import { useState, useContext } from 'react';
import Login from '../components/Login'
import AddExpense from '../components/AddExpense'
import AllExpenses from '../components/AllExpenses'
import {UserContext} from '../UserContext'
import {ExpensesContext} from '../ExpensesContext'

function Home() {
  const {user, setUser} = useContext(UserContext)
  return (
    <div>
      
    </div>
  );
}

export default Home;