import React, {useState, useContext} from 'react'
import { UserContext } from '../UserContext';
import { ExpensesContext } from '../ExpensesContext';
import {BrowserRouter as Router, Switch, Route, Routes, Link, Navigate} from 'react-router-dom'
import axios from 'axios';

function Register() {
const {user,setUser} = useContext(UserContext);
const [firstname, setFirstname] = useState("")
const [lastname, setLastname] = useState("")
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")

if (user) {
    return <Navigate to="/" replace />;
    }

  const onRegisterSubmit = (e) => {
    e.preventDefault();
    axios.post(process.env.REACT_APP_BACKEND_URL + '/register', {
        firstname: firstname,
        lastname: lastname,
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
        }
        })
    .catch(err => {
        if(err.response.status === 409) console.log("jau ir sads lietotajvards")
    })

  }
    
  return (
    <div className="container-sm pt-4"  style={{maxWidth: "500px"}}>
        <form className="mb-3" onSubmit={onRegisterSubmit}>
            <div class="form-group mb-2">
                <label for="firstnameinput">First name</label>
                <input type="text" class="form-control bg-white" id="firstnameinput" placeholder="Enter first name" value={firstname} required onChange={
                    (e) => {setFirstname(e.target.value)}
                }></input>
            </div>
            <div class="form-group mb-2">
                <label for="lastnameinput">Last name</label>
                <input type="text" class="form-control bg-white" id="lastnameinput" placeholder="Enter last name" value={lastname} required onChange={
                    (e) => {setLastname(e.target.value)}
                }></input>
            </div>
            <div class="form-group mb-2">
                <label for="usernameinput">Username</label>
                <input type="text" class="form-control bg-white" id="usernameinput" placeholder="Enter username" value={username} required onChange={
                    (e) => {setUsername(e.target.value)}
                }></input>
            </div>
            <div class="form-group mb-2">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control bg-white" id="exampleInputPassword1" placeholder="Password" minlength="8" required value={password} onChange={
                    (e) => {setPassword(e.target.value)}
                }></input>
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
        </form>       
    </div>
  )
}

export default Register