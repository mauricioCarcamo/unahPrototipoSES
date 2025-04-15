import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './layout/Layout'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './layout/Profile'
import Products from './pages/Logistics/Products'
import Collections from './pages/products/categories/Collections'
import ProductsPerCollection from './pages/products/categories/ProductsPerCollection'
import ProductDetail from './pages/products/categories/ProductDetail'
import Featured from './pages/products/categories/Featured'
import Clearance from './pages/products/categories/Clereance'
import CompareProducts from './pages/products/CompareProducts'
import Summary from './pages/Cart/Summary'
import ShippingMethods from './pages/Cart/ShippingMethods'
import PaymentMethods from './pages/Cart/PaymentsMethods'
import UserPaymentMehods from './pages/account/UserPaymentMehods'
import PasswordChange from './pages/Cart/PasswordChange'
import SavedAddresses from './pages/Cart/SavedAddresses'
import OrderHistory from './pages/Cart/OrderHistory'
import GiftCards from './pages/Cart/GiftCards'

import "keen-slider/keen-slider.min.css";
import UserHome from './pages/UserHome'
import Clients from './pages/admin/clients'
import Inventary from './pages/Logistics/Inventary'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="home" index  element={<UserHome />} />
            <Route path="profile" element={ <Profile /> }    />
            <Route path="products" >
              <Route path="" element={<Navigate to="collections" />} />
              <Route path='collections' element={ <Collections /> } />
              <Route path="collection/:id" element={ <ProductsPerCollection /> } />
              <Route path='productDetail/:id' element={ <ProductDetail /> } />
              <Route path='featured' element={ <Featured /> } />
              <Route path='clereance' element={ <Clearance /> } />
              <Route path='compare' element={ <CompareProducts /> } />
            </Route>

            <Route path='cart'>
              <Route path='' element={ <Navigate to='summary' /> } />
              <Route path='summary' element={ <Summary /> } />
              <Route path='shipping-methods' element={ <ShippingMethods /> } />
              <Route path='payment-methods' element={ <PaymentMethods /> } />
            </Route>

            <Route path='account'>
              <Route path='' element={ <Navigate to='payment-methods' /> } />
              <Route path='payment-methods' element={ <UserPaymentMehods /> } />
              <Route path='password-change' element={ <PasswordChange /> } />
              <Route path='saved-addresses' element={ <SavedAddresses /> } />
              <Route path='order-history' element={ <OrderHistory /> } />
              <Route path='gift-cards' element={ <GiftCards /> } />
            </Route>

            <Route path='admin'>
              <Route path='clients' element={ <Clients /> } />
              <Route path='users' element={ <Clients /> } />
              <Route path='queries' element={ <Clients /> } />
            </Route>

            <Route path='logistics'>
              <Route path='inventary' element={ <Inventary /> } />
              <Route path='orders' element={ <Inventary /> } />



            </Route>



          </Route>

          <Route path='login' element={<Login />} ></Route>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
