
import { useState, useContext } from 'react';

import Login from '../components/Login'
import AddExpense from '../components/AddExpense'
import AllExpenses from '../components/AllExpenses'
import {UserContext} from '../UserContext'

function Expenses() {
  const {user, setUser} = useContext(UserContext)
  return (
    <div >
      <AllExpenses />
    </div>
  );
}

export default Expenses;