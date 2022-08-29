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
      <div class="dropdown show">
        <a class="btn btn-secondary dropdown-toggle" onClick={() => setDropdownVisible(!dropdownVisible)}>
         {currentCategory}
        </a>
        <div class="dropdown-menu" style={{display: dropdownVisible ? "block" : "none"}}>
          <a class="dropdown-item" onClick={(e) => setCurrentCategory(e.target.innerText)}>See All</a>
          {categories.map(c => <a class="dropdown-item" onClick={(e) => setCurrentCategory(e.target.innerText)}>{c}</a>)}  
        </div>
      </div>
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
