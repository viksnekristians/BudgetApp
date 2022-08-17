import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import {UserContext} from '../UserContext'

function AllExpenses() {
  const [expenses, setExpenses] = useState([]);
  const {user, setUser} = useContext(UserContext);
  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL + '/expenses/' + user.id)
    .then(response => response.data)
    .then(expenses => console.log(expenses[0].title));
  })
  return (
    <div>{user.id} njnj</div>
  )
}

export default AllExpenses
