import React, { useState, useEffect, useContext } from 'react'
import {UserContext} from '../UserContext'
import { ExpensesContext } from '../ExpensesContext';
import CloseButton from 'react-bootstrap/CloseButton';
import authAxios from '../api/authAxios';

function Expense(props) {
    const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

  const deleteExpense = () => {
    authAxios.delete(process.env.REACT_APP_BACKEND_URL + '/delete-expense/' + props.expense._id)
    .then(() => console.log(expenses[3]._id , "  " , props.expense._id));
    setExpenses(expenses.filter(ex => ex._id !== props.expense._id))
  }

  const {expenses, setExpenses} = useContext(ExpensesContext);
  const {user, setUser} = useContext(UserContext);


  return (
    <div class="card w-50 mb-2 mx-auto w-100-tablet">
        <div class="card-body">
          <div class="d-flex flex-row justify-content-between">
            <h5 class="card-title">{props.expense.title}</h5>
            <CloseButton onClick={deleteExpense} />
          </div>
          <p class="card-text">{props.expense.description}</p>
          <p class="card-text" style={{color: props.categoryIdx < colors.length ? colors[props.categoryIdx] : colors[props.categoryIdx % colors.length]}}><b>{props.expense.category}</b></p>
          <p class="card-text"><span style={{fontSize: "24px"}}><b>{Number(props.expense.amount).toFixed(2)} €</b></span></p>

        </div>
    </div>
  )
}

export default Expense