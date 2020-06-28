import {combineReducers} from "redux";
import ProductReducer from "./ProductReducer";
import AuthReducer from "./AuthReducer";
import ErrorReducer from "./ErrorReducer";
import ProfileReducer from "./ProfileReducer";
import cartReducer from "./CartReducer";


const rootReducer = combineReducers({

    ProductReducer,
    error : ErrorReducer,
    auth : AuthReducer,
    profile : ProfileReducer,
    cart : cartReducer

})

export default rootReducer;
