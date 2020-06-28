import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { updateCart } from '../../Redux/Actions/CartActions';
import axios from "axios";
import { Link } from 'react-router-dom';
import {Redirect} from "react-router-dom";
import {tokenConfig} from "../../Redux/Actions/AuthActions";

class Cart extends Component {

    state = {

        cart : []

    }

    componentDidMount(){

    
      setTimeout(()=>{


        this.setState({

            cart : this.props.user.cart

        })

       
      },400)
 
    
    }

    deleteProductFromCart(product){

        let cart = this.state.cart;

        cart = cart.filter(c=>{

            return c.product._id !== product._id

        })

        this.setState({

            cart : cart

        })

        this.props.updateCart(this.props.user._id,cart);

    }

    renderCart(){

        let cart = this.state.cart;
        
      
        return(
            <div>
            <br/><br/>
            <h2>Cart</h2>
            <table class="table table-dark">
            <thead>
                <tr>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>

                {
                    cart.map(c=>(

                        <tr>
                        <td><Link to={"/products/"+c.product._id}>{c.product.name}</Link></td>
                        <td>{c.product.price}</td>
                        <td>{c.quantity}</td>
                        <td>{c.quantity * c.product.price}</td>
                        <td><button className="btn btn-danger" onClick={()=>this.deleteProductFromCart(c.product)}>Delete</button></td>
                        </tr>

                    ))

                }        
            </tbody>
            </table>
            
        </div>
        )

    }
    renderEmpty(){

        return(
            <div>
                <br/>
                <h1>There is No Product On Your Cart For Now !</h1>
            </div>
        )

    }

    render() {

        
        if(this.props.token === null) return <Redirect to="/" />

        let cart = this.state.cart;
      
        return (
            cart.length !== 0 ? this.renderCart() : this.renderEmpty()
        )
    }
}
function mapStateToProps(state){

    return{
  
       user : state.auth.user || {email :'', name : '', pic : ''},
       token : state.auth.token,
       auth : state

    }
  
  }
  
  function mapDispatchToProps(dispatch){
  
    return{
  
      updateCart : bindActionCreators(updateCart,dispatch)
  
    }
  
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Cart)
