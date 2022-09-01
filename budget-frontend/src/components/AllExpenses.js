import React, { useState, useContext } from 'react'
import {UserContext} from '../UserContext'
import { ExpensesContext } from '../ExpensesContext';
import Expense from './Expense';

function AllExpenses() {
  const {expenses, setExpenses} = useContext(ExpensesContext);
  const {user, setUser} = useContext(UserContext);
  const categories = [...new Set(expenses.map(expense => expense.category))]
  const [dropdownVisible,setDropdownVisible] = useState(false)
  const [currentCategory, setCurrentCategory] = useState("See All");
  return (
    <div className="container-sm pt-4">
      <div class="dropdown show w-50 mx-auto">
        <a class="btn btn-blue dropdown-toggle mb-2" onClick={() => setDropdownVisible(!dropdownVisible)}>
         {currentCategory}
        </a>
        <div class="dropdown-menu w-100" style={{display: dropdownVisible ? "block" : "none"}}>
          <a class="dropdown-item w-100" onClick={(e) => setCurrentCategory(e.target.innerText)}>See All</a>
          {categories.map(c => <a class="dropdown-item" onClick={(e) => setCurrentCategory(e.target.innerText)}>{c}</a>)}  
        </div>
      </div>
      {currentCategory === "See All" ? <p className="w-50 mx-auto">Total expenses: <span style={{fontSize: "24px"}}><b>{expenses.reduce((total, expense) => total+expense.amount,0).toFixed(2)} €</b></span></p> : 
      <p className="w-50 mx-auto">Total expenses in category {currentCategory}: <span style={{fontSize: "24px"}}><b>{expenses.reduce((total, expense) => {
      if (expense.category === currentCategory) {
        return total+ expense.amount;
      } 
      return total;
    }, 0).toFixed(2)} €</b></span></p>}
      <div>{currentCategory !== "See All" ? expenses.filter(ex => ex.category === currentCategory).map(ex =>
      <Expense expense={ex} categoryIdx={categories.indexOf(ex.category)} />
    ) : expenses.map(ex =>
      <Expense expense={ex} categoryIdx={categories.indexOf(ex.category)} />
    )}
    </div>
    </div>
    
  )
}

export default AllExpenses
