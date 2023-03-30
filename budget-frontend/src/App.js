
import { useState, useEffect } from 'react';
import authAxios from './api/authAxios';
import AddExpense from './components/AddExpense'
import AllExpenses from './components/AllExpenses'
import {UserContext} from './UserContext'
import { ExpensesContext } from './ExpensesContext';
import {BrowserRouter as Router, Switch, Route, Routes, Link, Navigate} from 'react-router-dom'
import Expenses from './pages/Expenses';
import Home from './pages/Home';
import Nav from './components/Nav';
import Login from './pages/Login';
import Register from './pages/Register';

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userdata")))
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    if (user !== null) {
      authAxios.get(process.env.REACT_APP_BACKEND_URL + '/expenses/' + user.id)
      .then(response => response.data)
      .then(ex => {
        setExpenses(ex);
        });
    }
    
  }, [user])
  return (
    <Router>
    <div className="App">
      <UserContext.Provider value={{user, setUser}}>
        <ExpensesContext.Provider value={{expenses, setExpenses}}>
          <Nav></Nav>
          <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/' element={
              <ProtectedRoute user={user}>
                <Home />
              </ProtectedRoute>}>
            </Route>
            <Route path='/expenses' element={
              <ProtectedRoute user={user}>
                <Expenses />
              </ProtectedRoute>}>
            </Route>
          </Routes>
        </ExpensesContext.Provider>
      </UserContext.Provider>
    </div>
    </Router>
  );
}

export default App;
