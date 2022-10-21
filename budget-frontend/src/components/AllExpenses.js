import React, { useState, useContext } from 'react'
import {UserContext} from '../UserContext'
import { ExpensesContext } from '../ExpensesContext';
import Expense from './Expense';
import CategoryButton from './CategoryButton';
import DatePicker from 'react-date-picker';
const moment = require('moment');

function AllExpenses() {
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
  const [endDate, setEndDate] = useState(new Date())
  const {expenses, setExpenses} = useContext(ExpensesContext);
  const currentExpenses = expenses.filter(e =>  Date.parse(e.createdAt) < Date.parse(new Date(endDate)))
  const {user, setUser} = useContext(UserContext);
  const categories = [...new Set(currentExpenses.map(expense => expense.category))]
  const [selectedCategories, setSelectedCategories] = useState([]);
 // const [startDate, setStartDate] = useState(moment().startOf('month').format('yyyy-MM-DD'))


  const onCategoryClick = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => {
        return c !== category
      }));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
    console.log(new Date(startDate))
    console.log(new Date(expenses[1].createdAt))
  }




  return (
    <div className="container-sm pt-5">   
        <div class = "categories-container">
          {categories.map((c,i) => <CategoryButton key={i} text={c} onClick={() => onCategoryClick(c)} />)}  
        </div>
        <DatePicker onChange={setStartDate} value={startDate}/>
        <DatePicker onChange={setEndDate} value={endDate} />
      {(selectedCategories.length === 0) ? <p className="w-50 mx-auto">Total expenses: <span style={{fontSize: "24px"}}><b>{currentExpenses.reduce((total, expense) => total+expense.amount,0).toFixed(2)} €</b></span></p> : 
      <p className="w-50 mx-auto">Total expenses in selected categories: <span style={{fontSize: "24px"}}><b>{currentExpenses.reduce((total, expense) => {
      if (selectedCategories.includes(expense.category)) {
        return total+ expense.amount;
      } 
      return total;
    }, 0).toFixed(2)} €</b></span></p>}
      <div>{selectedCategories.length !== 0 ? currentExpenses.filter(ex => selectedCategories.includes(ex.category)).map((ex,i) =>
      <Expense key={i} expense={ex} categoryIdx={categories.indexOf(ex.category)} />
    ) : currentExpenses.map((ex,i) =>
      <Expense key={i} expense={ex} categoryIdx={categories.indexOf(ex.category)} />
    )}
    </div>
    </div>
    
  )
}

export default AllExpenses
