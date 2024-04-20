import { useState, useEffect } from 'react'
import './App.css'
import Login from "./components/Login"
import Resister from './components/Register'

function App() {

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((res) => res.text())
      .then((data) => setMessage(data));
  }, []);

  return (
    <>
      <h1>Next.js + Flask</h1>
      <p>{message}</p>
      <Login />
      <Resister />
    </>
  )
}

export default App
