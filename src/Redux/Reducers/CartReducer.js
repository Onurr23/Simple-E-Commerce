let cart = [

    {productId : {name : '', price : 0}, quantity : 0}


];

export function cartReducer(state = cart, action){

    if(action.type==='UPDATED_CART'){

        return action.payload;

    }else if(action.type==='CART_LOADED'){

        return action.payload;

    }else{

        return state;

    }

}

export default cartReducer;