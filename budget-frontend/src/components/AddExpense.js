import React, {useState} from 'react'

function AddExpense() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [userID, setUserID] = useState("");

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
        userID: "123456"
      })
      })
      /*.then((response) => response.json())
      .then((result) => {
        console.log(result)
      })*/
  }

  return (
    <form onSubmit={addNewExpense} action="http://localhost:3000/add-expense" method="get">
      <label for="title"><b>Title</b></label>
      <input type="text" placeholder="Title" name="title" required onChange={handleTitleChange}></input>
      <label for="category"><b>Category</b></label>
      <input type="text" placeholder="Category" name="category" onChange={handleCategoryChange}></input>
      <label for="desc"><b>Description</b></label>
      <textarea placeholder="Description" name="desc" required onChange={handleDescriptionChange}></textarea>
      <label for="title"><b>Amount</b></label>
      <input type="number" name="amount" required onChange={handleAmountChange}></input>
      <button>Add expense</button>
   </form>
  )
}

export default AddExpense