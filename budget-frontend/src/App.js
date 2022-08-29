
import { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login'
import AddExpense from './components/AddExpense'
import AllExpenses from './components/AllExpenses'
import {UserContext} from './UserContext'
import { ExpensesContext } from './ExpensesContext';
import {BrowserRouter as Router, Switch, Route, Routes, Link} from 'react-router-dom'
import Expenses from './pages/Expenses';
import Home from './pages/Home';
import Nav from './components/Nav';

function App() {
  const [user, setUser] = useState({
    firstName: "Kristians",
    id: '123456'
  })
  const [expenses, setExpenses] = useState([])
  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL + '/expenses/' + user.id)
    .then(response => response.data)
    .then(ex => {
      console.log(ex);
      if (user) console.log("user logged in")
      else console.log("no user")
      setExpenses(ex);
      });
  }, [])
  return (
    <Router>
    <div className="App">
      <UserContext.Provider value={{user, setUser}}>
        <ExpensesContext.Provider value={{expenses, setExpenses}}>
          <Nav></Nav>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/expenses' element={<Expenses />}></Route>
          </Routes>
        </ExpensesContext.Provider>
      </UserContext.Provider>
    </div>
    </Router>
  );
}

export default App;
