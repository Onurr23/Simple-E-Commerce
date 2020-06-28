const initialState = {

    msg : {},
    status : null,
    id : null

}

export function ErrorReducer(state = initialState,action){

    if(action.type === "GET_ERRORS"){

        return {

            msg : action.payload.msg,
            status : action.payload.status,
            id : action.payload.id

        }

    }else if(action.type === "CLEAR_ERRORS"){

        return{

            msg : {},
            status : null,
            id : null

        }

    }else{

        return state;

    }


}

export default ErrorReducer;