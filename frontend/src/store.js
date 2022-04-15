import {createStore,combineReducers,applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { productListener } from './reducers/productReducers';
import { productDetailsListener } from './reducers/productReducers';
import { cartListener } from './reducers/cartReducers';
const reducer = combineReducers({
    productList:productListener,
    productDetails:productDetailsListener,
    cart:cartListener
});

//getting data from local storage
const cartItemsFromStorage = localStorage.getItem('cartItems')
? JSON.parse(localStorage.getItem('cartItems'))
: []
const initialState = {}
const cartItems = {

}

const middleware = [thunk]
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))
export default store;