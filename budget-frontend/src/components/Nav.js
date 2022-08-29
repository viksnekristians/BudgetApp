import React from 'react'
import { useState } from 'react';
import {Link} from 'react-router-dom'
import AddExpense from './AddExpense'

function Nav() {

  const [showAddExpense, setShowAddExpense] = useState(false);
 
  return (
    <div className="bg-dark ">
      <nav class="navbar navbar-expand-lg navbar-dark container-sm">
      <a class="navbar-brand px-2" href="#">Budget App</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
          <Link to='/' className='nav-link'>Home</Link>
          </li>
          <li class="nav-item">
          <Link to='/expenses' className='nav-link'>Expenses</Link>
          </li>
          <li style={{position: "relative"}}>
            <button className={!showAddExpense ? "btn btn-success" : "btn btn-danger"} onClick={() => {setShowAddExpense(!showAddExpense)}}>Add expense</button>
            {showAddExpense &&
             <AddExpense></AddExpense>
            }
          </li>
        </ul> 
      </div>
    </nav>
  </div>
   
  )
}

export default Nav