import {createStore,combineReducers,applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { productListener } from './reducers/productReducers';
import { productDetailsListener } from './reducers/productReducers';
import { cartListener } from './reducers/cartReducers';
import { userListener,registerListener,updateListener,updateProfile } from './reducers/userReducers';
const reducer = combineReducers({
    productList:productListener,
    productDetails:productDetailsListener,
    cart:cartListener,
    userDetails: userListener,
    register:registerListener,
    userProfile:updateListener,
    update:updateProfile,
});

//getting data from local storage
const cartItemsFromStorage = localStorage.getItem('cartItems')
? JSON.parse(localStorage.getItem('cartItems'))
: []
//getting user info from local storage
const userInfoFromStorage = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo'))
: null
const initialState = {
    cart:{cartItems:cartItemsFromStorage},
    userDetails:{userInfo:userInfoFromStorage},
    
}


const middleware = [thunk]
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))
export default store;