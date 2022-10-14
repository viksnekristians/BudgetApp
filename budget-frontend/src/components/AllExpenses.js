import React, { useState, useContext } from 'react'
import {UserContext} from '../UserContext'
import { ExpensesContext } from '../ExpensesContext';
import Expense from './Expense';
import CategoryButton from './CategoryButton';

function AllExpenses() {
  const {expenses, setExpenses} = useContext(ExpensesContext);
  const {user, setUser} = useContext(UserContext);
  const categories = [...new Set(expenses.map(expense => expense.category))]
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("See All");

  const onCategoryClick = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => {
        return c !== category
      }));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  return (
    <div className="container-sm pt-5">   
        <div class = "categories-container">
          {categories.map((c,i) => <CategoryButton key={i} text={c} onClick={() => onCategoryClick(c)} />)}  
        </div>
      {(selectedCategories.length === 0) ? <p className="w-50 mx-auto">Total expenses: <span style={{fontSize: "24px"}}><b>{expenses.reduce((total, expense) => total+expense.amount,0).toFixed(2)} €</b></span></p> : 
      <p className="w-50 mx-auto">Total expenses in selected categories: <span style={{fontSize: "24px"}}><b>{expenses.reduce((total, expense) => {
      if (selectedCategories.includes(expense.category)) {
        return total+ expense.amount;
      } 
      return total;
    }, 0).toFixed(2)} €</b></span></p>}
      <div>{selectedCategories.length !== 0 ? expenses.filter(ex => selectedCategories.includes(ex.category)).map((ex,i) =>
      <Expense key={i} expense={ex} categoryIdx={categories.indexOf(ex.category)} />
    ) : expenses.map((ex,i) =>
      <Expense key={i} expense={ex} categoryIdx={categories.indexOf(ex.category)} />
    )}
    </div>
    </div>
    
  )
}

export default AllExpenses
