
import { useState } from 'react';
import './App.css';
import Login from './components/Login'
import AddExpense from './components/AddExpense'
import AllExpenses from './components/AllExpenses'
import {UserContext} from './UserContext'

function App() {
  const expenses = ["first", "second"];
 // const [expenses, setExpenses] = useState(["first", "second"]);
  return (
    <div className="App">
      <UserContext.Provider value="test">
       <AllExpenses/>
      </UserContext.Provider>
    </div>
  );
}

export default App;
