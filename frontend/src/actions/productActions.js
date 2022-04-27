import axios from "axios"

//thunk is an func within a func
export const listProducts = (Keyword = '',pageNumber = '') => async(dispatch)=>{
    try {
        //sending the request
        dispatch({type:'PRODUCT_LIST_REQUEST'})
        
        //getting the data
        const {data} = await axios.get(`/api/products?keyword=${Keyword}&pageNumber=${pageNumber}`);
        
        //sending data to reducer
        dispatch({type:'PRODUCT_LIST_SUCCESS',payload:data});
    } catch (error) {
        dispatch({type:'PRODUCT_LIST_FAIL',payload:error.response && error.response.data.message
        ? error.response.data.message
        : error.message,});
    }
}

export const listProductDetails = (id) => async(dispatch)=>{
    try {
        //sending the request
        dispatch({type:'PRODUCT_DETAIL_REQUEST'})
        
        //getting the data
        const {data} = await axios.get(`/api/products/${id}`);
        
        //sending data to reducer
        dispatch({type:'PRODUCT_DETAIL_SUCCESS',payload:data});
    } catch (error) {
        dispatch({type:'PRODUCT_DETAIL_FAIL',payload:error.response && error.response.data.message
        ? error.response.data.message
        : error.message,});
    }
}

export const reviewList = (id,review) => async(dispatch,getState)=>{
    try {
        //sending the request
        dispatch({type:'PRODUCT_REVIEW_REQUEST'})
        const {userDetails:{userInfo}} =  getState()
    //success
        //passing the headers for auth     
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        //getting the data
        await axios.post(`/api/products/${id}/reviews`,review,config);
        
        //sending data to reducer
        dispatch({type:'PRODUCT_REVIEW_SUCCESS'});
    } catch (error) {
        dispatch({type:'PRODUCT_REVIEW_FAIL',payload:error.response && error.response.data.message
        ? error.response.data.message
        : error.message,});
    }
}

export const listTopProducts = () => async(dispatch)=>{
    try {
        //sending the request
        dispatch({type:'PRODUCT_TOP_CAROUSEL_REQUEST'})
        
        //getting the data
        const {data} = await axios.get(`/api/products/top`);
        
        //sending data to reducer
        dispatch({type:'PRODUCT_TOP_CAROUSEL_SUCCESS',payload:data});
    } catch (error) {
        dispatch({type:'PRODUCT_TOP_CAROUSEL_FAIL',payload:error.response && error.response.data.message
        ? error.response.data.message
        : error.message,});
    }
}