import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import React from 'react';
import Home from './screens/Home';
import SingleProductScreen from './screens/SingleProductScreen';
import Profile from './screens/Profile';
import Cart from './screens/Cart';
import Login from './screens/Login';

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
      </Routes>
    </Router>
    </>
  );
}

export default App;
