import React from 'react'

function Login() {
  return (
    <form action="http://localhost:3000" method="post">
        <label for="uname"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="uname" required></input>

        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required></input>
        <input type="submit" value="Submit"></input>
    </form>
  )
}

export default Login