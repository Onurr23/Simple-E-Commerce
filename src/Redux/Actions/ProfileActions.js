import axios from "axios";
import {tokenConfig} from "../Actions/AuthActions"

export function getProfile(id){

    return(dispatch,getState)=>{

            axios.get('http://localhost:5000/profile/'+id,tokenConfig(getState)).then(profile=>{

                dispatch({type : 'PROFILE_LOADED',payload : profile.data})

            }).catch(err=>{

                console.log(err)

            })

    }


}

export function updateUser(id,user){

    return(dispatch,getState)=>{


        axios.post('http://localhost:5000/user/update/'+id,user,tokenConfig(getState)).then(()=>{

            dispatch({type : 'PROFILE_UPDATED',payload : ''})
    
        }).catch(err=>{
    
            console.log(err)
    
        })


    }

}

export default {getProfile,updateUser};