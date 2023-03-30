import React, {useState, useContext} from 'react'
import { UserContext } from '../UserContext';
import { ExpensesContext } from '../ExpensesContext';
import authAxios from '../api/authAxios';

function AddExpense() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [categoriesVisible, setCategoriesVisible] = useState(false)
  
  const {user, setUser} = useContext(UserContext)
  const {expenses, setExpenses} = useContext(ExpensesContext)

  const categories = [...new Set(expenses.map(expense => expense.category))]

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  }

  const handleCategoryClick = (c) => {
    setCategory(c)
    setCategoriesVisible(false)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleAmountChange = (e) => {
    setAmount(e.target.value)
  }

  const addNewExpense = (e) => {
    e.preventDefault();

    /*const authAxios = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      headers: {
          Authorization: authHeader()
      }
    });*/
    authAxios.post(process.env.REACT_APP_BACKEND_URL + '/add-expense', {
        title: title,
        category: category, 
        desc: description,
        amount: Number(amount),
        userID: user.id
    })
    .then(response => response.data)
    .then((expense) => {
      console.log(expense)
      setExpenses([...expenses, expense])
    })
     setTitle("");
     setDescription("");
     setCategory("");
     setAmount(0);
  }

  return (
    <form id="add-expense-form" className='add-expense-form p-3' onSubmit={addNewExpense} action="http://localhost:3000/add-expense" method="get" >
      <div class="mb-3">
        <label for="title" class="form-label text-white"><b>Title</b></label>
        <input type="text" class="form-control" placeholder="Title" name="title" value={title} required onChange={handleTitleChange}></input>
      </div>
      <div class="mb-3">
        <label for="category" class="form-label text-white"><b>Category</b></label>
        <input type="text" class="form-control" placeholder="Category" name="category" value={category} onChange={handleCategoryChange}></input>
      </div>
      <div class="dropdown mb-3 position-relative">
        <button class="btn btn-secondary dropdown-toggle bg-light text-dark" type="button" id="dropdownMenuButton" onClick={() => setCategoriesVisible(!categoriesVisible)}>
          Select from existing categories
        </button>
        <div class="category-dropdown-menu bg-white p-2" style={{display: categoriesVisible ? "block" : "none"}}>
          {categories.map(c => <a class="dropdown-item" href="#" onClick={() => handleCategoryClick(c)}>{c}</a>)}
        </div>
      </div>
      <div class="mb-3">
        <label for="desc" class="form-label text-white"><b>Description</b></label>
        <textarea placeholder="Description" name="desc" class="form-control" value={description} required onChange={handleDescriptionChange}></textarea>
      </div>
      <div class="mb-3">
        <label for="amount" class="form-label text-white"><b>Amount</b></label>
        <input type="number" step="0.01" name="amount" class="form-control" value={amount} required onChange={handleAmountChange}></input>
      </div>
      <button type="submit" class="btn btn-primary">Add expense</button>
   </form>
   
  )
}

export default AddExpense