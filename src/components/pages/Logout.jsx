import React from 'react'
import { useCookies } from "react-cookie";

export default function Logout() {
  const [cookies, removeCookie] = useCookies(["token"]);

  function handleRemoveCookie() {
    removeCookie("token");
  }

  return (
    <div className="App">
      <h1>React Cookie</h1>
      <p>{cookies.user}</p> {/* access user cookie */}
      <button onClick={handleRemoveCookie}>Remove Cookie</button>
    </div>
  )
}