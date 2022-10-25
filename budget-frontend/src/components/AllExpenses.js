import React, { useState, useContext, useEffect} from 'react'
import {UserContext} from '../UserContext'
import { ExpensesContext } from '../ExpensesContext';
import Expense from './Expense';
import CategoryButton from './CategoryButton';
import DatePicker from 'react-date-picker';

function AllExpenses() {
  
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
  const [endDate, setEndDate] = useState(new Date())
  const {expenses, setExpenses} = useContext(ExpensesContext);

  var currentExpenses = expenses.filter(e =>  
    (new Date(e.createdAt).getTime() <= (new Date(endDate).getTime() + 60 * 60 * 24 * 1000)) && (Date.parse(new Date(e.createdAt)) >= Date.parse(new Date(startDate)))
  )
  const {user, setUser} = useContext(UserContext);
  const categories = [...new Set(currentExpenses.map(expense => expense.category))]
  const [selectedCategories, setSelectedCategories] = useState([]);

  const onCategoryClick = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => {
        return c !== category
      }));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }

  }

  useEffect(() => {
    setSelectedCategories(selectedCategories.filter(sc => {
      return categories.includes(sc)
    }))
  }, [categories])

  return (
    <div className="container-sm pt-5">   
        <div className = "categories-container">
          {categories.map((c,i) => <CategoryButton key={i} text={c} on onClick={() => onCategoryClick(c)} />)}  
        </div>
        <div className="date-pickers-container d-flex flex-row justify-content-between w-50 mx-auto w-100-tablet mb-5">
          <div className="date-picker">
            <p className="select-date-text">Select start date:</p>
            <DatePicker onChange={setStartDate} value={startDate}/>
          </div>
          <div className="date-picker">
            <p className="select-date-text">Select end date:</p>
            <DatePicker onChange={setEndDate} value={endDate} />
          </div>
        </div>
        
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
