import React, {useState, useContext} from 'react'
import { UserContext } from '../UserContext';
import { ExpensesContext } from '../ExpensesContext';
import {BrowserRouter as Router, Switch, Route, Routes, Link, Navigate} from 'react-router-dom'
import axios from 'axios';
import authAxios from '../api/authAxios';

function Login() {
const {user,setUser} = useContext(UserContext);
const {expenses, setExpenses} = useContext(ExpensesContext);
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
  //  axios.defaults.withCredentials = true;
    if (user) {
        return <Navigate to="/" replace />;
    }


  const onLoginSubmit = (e) => {
    e.preventDefault();
    axios.post(process.env.REACT_APP_BACKEND_URL + '/login', {
        username: username,
        password: password
    }, { withCredentials: true})
    .then(response => response.data)
    .then(data => {
      const foundUser = data.user;
      const accessToken = data.accessToken;
      if (!foundUser) console.log("no user")
      else {
        setUser(foundUser);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("token", accessToken);
        localStorage.setItem("userdata", JSON.stringify(foundUser));
        /*const authAxios = axios.create({
            baseURL: process.env.REACT_APP_BACKEND_URL,
            headers: {
                Authorization: authHeader()
            }
        });*/
        
        authAxios.get(process.env.REACT_APP_BACKEND_URL + '/expenses/' + foundUser.id)
        .then(response => response.data)
        .then(ex => {
            setExpenses(ex);
            });
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