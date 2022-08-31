
import { useState, useContext } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

import AllExpenses from '../components/AllExpenses'
import {UserContext} from '../UserContext'

function Expenses() {
  const {user, setUser} = useContext(UserContext)
  return (
    <div >
      <AllExpenses />
    </div>
  );
}

export default Expenses;