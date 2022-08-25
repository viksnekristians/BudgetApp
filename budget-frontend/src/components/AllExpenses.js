import React, { useState, useEffect, useContext } from 'react'
import {UserContext} from '../UserContext'
import { ExpensesContext } from '../ExpensesContext';

function AllExpenses() {
  const {expenses, setExpenses} = useContext(ExpensesContext);
  const {user, setUser} = useContext(UserContext);
  return (
    <div>{expenses.map(ex =><p>{ex.title}</p>)}
    <button onClick={() => {
     setUser({id: "new"})
    }}>Click</button>
    </div>
  )
}

export default AllExpenses
