
export function returnErrors(msg,status,id=null){

    return{

        type : 'GET_ERRORS',
        payload : {msg,status,id}

    }

}

export function clearErrors(){

    return{

        type : 'CLEAR_ERRORS'

    }

}