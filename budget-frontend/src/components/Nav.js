import React, { useContext } from 'react'
import { useState } from 'react';
import {Link} from 'react-router-dom'
import AddExpense from './AddExpense'
import { UserContext } from '../UserContext';

function Nav() {
  const {user, setUser} = useContext(UserContext)
  const [showAddExpense, setShowAddExpense] = useState(false);
  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    setUser(null);
  }
 
  return (
    <div className="bg-dark ">
      <nav class="navbar navbar-expand-lg navbar-dark container-sm">
      <a class="navbar-brand px-2" href="/">Budget App</a>
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
            <button className={!showAddExpense ? "btn btn-success" : "btn btn-danger"} onClick={() => {setShowAddExpense(!showAddExpense)}}>{!showAddExpense ? "Add expense" : "Close"}</button>
            {showAddExpense &&
             <AddExpense></AddExpense>
            }
          </li>
        </ul> 
        <div style={{marginLeft: "auto"}}>{user && <button className="btn btn-danger" onClick={handleLogout}>Log out</button>}</div>
      </div>
    </nav>
  </div>
   
  )
}

export default Nav