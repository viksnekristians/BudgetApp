import React, {useState, useContext} from 'react'
import { UserContext } from '../UserContext';
import { ExpensesContext } from '../ExpensesContext';
import {BrowserRouter as Router, Switch, Route, Routes, Link, Navigate} from 'react-router-dom'
import axios from 'axios';

function Login() {
const {user,setUser} = useContext(UserContext);
const {expenses, setExpenses} = useContext(ExpensesContext);
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")

if (user) {
    return <Navigate to="/" replace />;
    }

  const onLoginSubmit = (e) => {
    e.preventDefault();
    axios.post(process.env.REACT_APP_BACKEND_URL + '/login', {
        username: username,
        password: password
    })
    .then(response => response.data)
    .then(user => {
      if (!user) console.log("no user")
      else {
        setUser({
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username
        })
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("userdata", JSON.stringify({
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username
        }));
        if (user !== null) {
            axios.get(process.env.REACT_APP_BACKEND_URL + '/expenses/' + user._id)
            .then(response => response.data)
            .then(ex => {
              setExpenses(ex);
              });
          }
      }
      });
  }
    
  return (
    <div className="container-sm pt-4"  style={{maxWidth: "500px"}}>
        <form className="mb-3" onSubmit={onLoginSubmit}>
            <div class="form-group mb-2">
                <label for="usernameinput">Username</label>
                <input type="text" class="form-control bg-white" id="usernameinput" placeholder="Enter username" value={username} onChange={
                    (e) => {setUsername(e.target.value)}
                }></input>
            </div>
            <div class="form-group mb-2">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control bg-white" id="exampleInputPassword1" placeholder="Password" value={password} onChange={
                    (e) => {setPassword(e.target.value)}
                }></input>
            </div>
            <button type="submit" class="btn btn-primary">Log in</button>
        </form>
        <p>Not registered? <a href="/register">Register</a></p>        
    </div>
  )
}

export default Login