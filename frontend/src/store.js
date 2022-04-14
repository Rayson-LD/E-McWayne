import {createStore,combineReducers,applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { productListener } from './reducers/productReducers';
import { productDetailsListener } from './reducers/productReducers';
const reducer = combineReducers({
    productList:productListener,
    productDetails:productDetailsListener
});

const initialState = {}

const middleware = [thunk]
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))
export default store;