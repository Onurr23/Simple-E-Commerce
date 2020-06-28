const initialState = {

    products : [

        {id : 1, name : '', description : '', price : ''}

    ],

    message : null

}

export function QuestionReducer(state=initialState.products,action) {

    if(action.type==='ALL_PRODUCTS'){

        return action.payload;

    }else if(action.type === 'PRODUCT') {

        return action.payload;

    }else if(action.type === 'PRODUCT_ADDED'){

        return action.payload;

    }else {

        return state;

    }

}

export default QuestionReducer;
