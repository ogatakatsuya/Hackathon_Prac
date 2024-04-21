import { useState, useEffect } from 'react'
import './App.css'
import Login from "./components/Login"
import Resister from './components/Register'
import Logout from './components/Logout'
import Form from './components/Form'
import Index from './components/Index'

function App() {

  const [message, setMessage] = useState('');
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((res) => res.text())
      .then((data) => setMessage(data));
  }, []);

  return (
    <>
      <h1>Next.js + Flask</h1>
      <p>{message}</p>
      {
        !accessToken ?
        <>
        <Login setAccessToken={setAccessToken}></Login> 
        <Resister />
        </>:
        <>
        <Index accessToken={accessToken}/>
        <Logout setAccessToken={setAccessToken}/>
        </>
      }
    </>
  )
}

export default App
