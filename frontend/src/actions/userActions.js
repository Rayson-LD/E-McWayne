import axios from "axios"


//thunk is an func within a func
export const userLogin = (email,password) => async(dispatch)=>{
        try {
        //request
        dispatch({
            type:'USER_LOGIN_REQUEST'})

        //success
            //passing the headers for auth
            const config = {
                headers:{
                    'Content-Type':'application/json'
                }
            }
            //getting the data
        const {data} = await axios.post(`/api/uers/login`,{email,password},config);
        dispatch({
            type:'USER_LOGIN_SUCCESS',
            payload:data
        })
        //adding data to local storage
        localStorage.setItem('userInfo',JSON.stringify(data));

        
        
        } catch (error) {
            dispatch({type:'USER_LOGIN_FAIL',payload:error.message});
        }
        //adding cart items to local storage
        
    
}