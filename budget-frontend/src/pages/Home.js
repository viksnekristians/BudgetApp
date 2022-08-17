
import { useState, useContext } from 'react';
import Login from '../components/Login'
import AddExpense from '../components/AddExpense'
import AllExpenses from '../components/AllExpenses'
import {UserContext} from '../UserContext'

function Home() {
  const {user, setUser} = useContext(UserContext)
  return (
    <div >
      {user.id}
    </div>
  );
}

export default Home;