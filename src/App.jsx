import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CustomerList from './CustomerList'
import Login from './Login'
import { Route, Router, Routes } from 'react-router-dom'
import Secure from './Secure'
import ProtectedRoute from './ProtectedRoute'




function App() {
  const [count, setCount] = useState(0)
  const user={displayName:"loda"}

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>

{/* <Router> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/customerList" element={
            <ProtectedRoute>
            <CustomerList />
            </ProtectedRoute>
            } />
        </Routes>
      {/* </Router> */}
    {/* <h1>MileExp Test App</h1>
    {!user ? (
      <Login onLogin={setUser} />
    ) : (
      <>
      
        <p>Welcome, {user.displayName} <button onClick={() => setUser(null)}>Logout</button></p>
        <CustomerList />   
      </>
    )} */}
  </div>
  )
}

export default App
