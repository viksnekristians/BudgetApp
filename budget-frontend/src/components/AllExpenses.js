import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import {UserContext} from '../UserContext'

function AllExpenses() {
  const [expenses, setExpenses] = useState([]);
  const txt = useContext(UserContext);
  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL + '/expenses').then(response => {
      console.log(response);
    })
  })
  return (
    <div>{txt}</div>
  )
}

export default AllExpenses
