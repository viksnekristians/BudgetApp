import React, {useState, useContext} from 'react'
import { UserContext } from '../UserContext';
import { ExpensesContext } from '../ExpensesContext';

function AddExpense() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  
  const {user, setUser} = useContext(UserContext)
  const {expenses, setExpenses} = useContext(ExpensesContext)

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleAmountChange = (e) => {
    setAmount(e.target.value)
  }

  const addNewExpense = (e) => {
    e.preventDefault();
      fetch('http://localhost:8000/add-expense', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        category: category, 
        desc: description,
        amount: amount,
        userID: user.id
      })
      })
      .then((response) => response.json())
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
    <form className='add-expense-form p-3' onSubmit={addNewExpense} action="http://localhost:3000/add-expense" method="get" >
      <div class="mb-3">
        <label for="title" class="form-label text-white"><b>Title</b></label>
        <input type="text" class="form-control" placeholder="Title" name="title" value={title} required onChange={handleTitleChange}></input>
      </div>
      <div class="mb-3">
        <label for="category" class="form-label text-white"><b>Category</b></label>
        <input type="text" class="form-control" placeholder="Category" name="category" value={category} onChange={handleCategoryChange}></input>
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