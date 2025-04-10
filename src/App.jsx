import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './layout/Layout'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './layout/Profile'
import Products from './pages/Products'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="home" index  element={<Home />} />
            <Route path="profile" element={ <Profile /> }    />
            <Route path="products" element={ <Products />}    />


          </Route>

          <Route path='login' element={<Login />} ></Route>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
