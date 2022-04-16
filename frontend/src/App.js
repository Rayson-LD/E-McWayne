import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import React from 'react';
import Home from './screens/Home';
import SingleProductScreen from './screens/SingleProductScreen';
import Profile from './screens/Profile';
import Cart from './screens/Cart';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/pid=:id/item=:name' element={<SingleProductScreen/>}/>
        <Route path='/profile' element={<Profile/>}/>
        {/*header view cart route */}
        <Route path='/cart' element={<Cart/>}/>

        {/*add to cart button */}
        <Route path='/cart/pid=:id/qty=:qty' element={<Cart/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
