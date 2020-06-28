import axios from "axios";
import { returnErrors } from "./ErrorActions";


export function loadUser(){

    return(dispatch,getState)=>{

        dispatch({type : 'USER_LOADING'}); 

        axios.get('http://localhost:5000/user',tokenConfig(getState))
        .then(res=>dispatch({

            type : 'USER_LOADED',
            payload : res.data

        })).catch(err=>{

            dispatch(returnErrors(err.response.data,err.response.status));
            dispatch({type : 'AUTH_ERROR'})

        })

    }

}

export function register(user){

   
    return(dispatch)=>{

        
        axios.post('http://localhost:5000/signup',user).then((response)=>{


        if(response.data === "ERROR_1"){


            dispatch({type : 'REGISTER_FAIL', payload : response.data})
            dispatch(returnErrors('This Email Address Is Already Taken',response.status,'REGISTER_FAIL'));


        }else if(response.data === "ERROR_4"){

            dispatch({type : 'REGISTER_FAIL', payload : response.data})
            dispatch(returnErrors('Please Fill Up All Fields !',response.status,'REGISTER_FAIL'));


        }else{

            dispatch({type : 'REGISTER_SUCCESS',payload : response.data});
            window.location = "/"

        }
       
        }).catch(err=>{

           dispatch(returnErrors(err.response.data,err.response.status,'REGISTER_FAIL'));
           dispatch({type : 'REGISTER_FAIL'})
    
        })
    
    }

}

export function signin(user){

   
    return(dispatch)=>{

        
        axios.post('http://localhost:5000/signin',user).then((response)=>{


        if(response.data === 'ERROR_2'){

            dispatch({type : 'LOGIN_FAIL', payload : response.data})
            dispatch(returnErrors('This Email Address Is Not Exist',response.status,'LOGIN_FAIL'));


        }else if(response.data === 'ERROR_3'){

            dispatch({type : 'LOGIN_FAIL', payload : response.data})
            dispatch(returnErrors('Password is Not Correct !',response.status,'LOGIN_FAIL'));


        }else if(response.data === 'ERROR_4'){

            dispatch({type : 'LOGIN_FAIL', payload : response.data})
            dispatch(returnErrors('Please Fill Up All Fields !',response.status,'LOGIN_FAIL'));


        }else{

            dispatch({type : 'LOGIN_SUCCESS',payload : response.data});
    
            window.location = "/"

        }


        }).catch(err=>{

           dispatch(returnErrors(err.response.data,err.response.status,'LOGIN_FAIL'));
           dispatch({type : 'LOGIN_FAIL'})
    
        })
    

    }

}

export function logout(){


        return{

            type : 'LOGOUT_SUCCESS'

        }


}

export function tokenConfig(getState){

    const token = getState().auth.token;

        const config = {
            headers : {

                "Content-type" : "application/json"
            }
        }
    
      if (token) {
        config.headers['x-auth-token'] = token;
      }
    
      return config;

}

export default {loadUser,register,logout,tokenConfig};