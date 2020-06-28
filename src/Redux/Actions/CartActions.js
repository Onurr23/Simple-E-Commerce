import axios from "axios";
import {tokenConfig} from "../Actions/AuthActions"


export function updateCart(id,cart){

    return(dispatch,getState)=>{

        axios.post('http://localhost:5000/cart/'+id,cart,tokenConfig(getState)).then(cart=>{

                dispatch({type : 'CART_UPDATED',payload : cart.data})
    
            }).catch(err=>{
               
                console.log(err);
                
            })
    }

}

export default {updateCart}

