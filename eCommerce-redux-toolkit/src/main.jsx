import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Dashboard from './features/dashboard/Dashboard.jsx'
import Cart from './features/cart/Cart.jsx'
import ProductDetail from './features/product/ProductDetail.jsx'
import { Provider } from 'react-redux'
import store from './store.js';
import Login from './features/login/Login.jsx'
import { Toaster } from "react-hot-toast";
import Register from './features/register/Register.jsx'
import Shipping from './features/shipping/Shipping.jsx'
import Payment from './features/payment/Payment.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import PlaceOrder from './features/order/PlaceOrder.jsx'
import OrderDetail from './features/order/OrderDetail.jsx'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import Profile from './features/user/Profile.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import Orders from './features/order/Orders.jsx'
import AdminProducts from './features/product/AdminProductList.jsx'
import ProductEdit from './features/product/ProductEdit.jsx'
import AdminUserList from './features/user/AdminUserList.jsx'
import UpdateUser from './features/user/UpdateUser.jsx'
import { HelmetProvider } from 'react-helmet-async'
import { GoogleOAuthProvider } from '@react-oauth/google'
import AdminDashboard from './features/dashboard/AdminDashboard.jsx'
import CreateProduct from './features/product/CreateProduct.jsx'
import NotFound from './components/NotFound.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Dashboard />} />
      <Route  path='/search/:keyword' element={<Dashboard />} />
      <Route  path='/search/:keyword/:pageNumber' element={<Dashboard />} />
      <Route  path='/:pageNumber' element={<Dashboard />} />
      <Route  path='/login' element={<Login />} />
      <Route  path='/register' element={<Register />} />
      <Route  path='/product/:productId' element={<ProductDetail />} />
      <Route  path='/cart' element={<Cart />} />
      <Route  path='' element={<PrivateRoute />} >
        <Route  path='/profile' element={<Profile />} />
        <Route  path='/Shipping' element={<Shipping />} />
        <Route  path='/payment' element={<Payment />} />
        <Route  path='/placeorder' element={<PlaceOrder />} />
        <Route  path='/orders/:id' element={<OrderDetail />} />
      </Route>
      <Route  path='' element={<AdminRoute />} >
        <Route  path='/admin' element={<AdminDashboard />} />
        <Route  path='/admin/orders' element={<Orders />} />
        <Route  path='/admin/products' element={<AdminProducts />} />
        <Route  path='/admin/createNew' element={<CreateProduct />} />
        <Route  path='/admin/products/search/:keyword' element={<Dashboard />} />
        <Route  path='/admin/products/search/:keyword/:pageNumber' element={<Dashboard />} />
        <Route  path='/admin/products/:pageNumber' element={<AdminProducts />} />
        <Route  path='/admin/product/:id/edit' element={<ProductEdit />} />
        <Route  path='/admin/users' element={<AdminUserList />} />
        <Route  path='/admin/user/:id/edit' element={<UpdateUser />} />

      </Route>
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='260774312841-af2uda2tolkmkg07s4r4dtv82cdonn3c.apps.googleusercontent.com'>
    <HelmetProvider>
      <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
      <Toaster 
            position="top-center"
            gutter={12}
            containerStyle={{margin:"10px"}}
            toastOptions={{
              success:{duration:3000},
              error:{duration:5000},
              style:{
                fontSize:"14px",
                maxWidth:"550px",
                padding:"14px 22px"
              }
            }}
            
          />
      </Provider>
    </HelmetProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
