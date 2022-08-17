
import { useState } from 'react';
import './App.css';
import Login from './components/Login'
import AddExpense from './components/AddExpense'
import AllExpenses from './components/AllExpenses'
import {UserContext} from './UserContext'
import {BrowserRouter as Router, Switch, Route, Routes, Link} from 'react-router-dom'
import Expenses from './pages/Expenses';
import Home from './pages/Home';
import Nav from './components/Nav';

function App() {
  const [user, setUser] = useState({
    id: "abc123",
    title: "title"
  })
 // const [expenses, setExpenses] = useState(["first", "second"]);
  return (
    <Router>
    <div className="App">
      <UserContext.Provider value={{user, setUser}}>
        <Nav></Nav>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/expenses' element={<Expenses />}></Route>
        </Routes>
      </UserContext.Provider>
    </div>
    </Router>
  );
}

export default App;
