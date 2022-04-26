import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import React from 'react';
import Home from './screens/Home';
import SingleProductScreen from './screens/SingleProductScreen';
import Profile from './screens/Profile';
import Cart from './screens/Cart';
import Login from './screens/Login';
import Register from './screens/Register';
import Shipping from './screens/Shipping';
import Payment from './screens/Payment';
import PlaceOrder from './screens/PlaceOrder';
import Order from './screens/Order';
import Delivery from './screens/Delivery';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/pid=:id/item=:name' element={<SingleProductScreen/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/cart/pid=:id' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/shipping' element={<Shipping/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/placeOrder' element={<PlaceOrder/>}/>
        <Route path='/orders/:id' element={<Order/>}/>
        <Route path='/orders/:id/pay=success' element={<Delivery/>}/>
        <Route path='/search/:Keyword/page/:pageNumber' element={<Home/>}/>
        <Route path='/page/:pageNumber' element={<Home/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
