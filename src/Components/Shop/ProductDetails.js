import React, { Component } from 'react'
import axios from "axios";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import {Redirect} from "react-router-dom";
import { deleteProduct } from '../../Redux/Actions/ProductActions';
import { updateCart } from '../../Redux/Actions/CartActions';

class ProductDetails extends Component {

    state = {

        product : {},
        owner : '',
        profile : '',
        name : '',
        cart : []

    }

    componentDidMount() {

        setTimeout(()=>{

            axios.get('http://localhost:5000/cart/'+this.props.user._id).then(cart=>{
    
                this.setState({
    
                    cart : cart.data
    
                })
    
            })
    
          },200)

        axios.get('http://localhost:5000/products/'+this.props.match.params.id).then(product=>{

            this.setState({
                product : product.data,
                owner : product.data.userId.email,
                profile : product.data.userId._id,
                name : product.data.userId.name,
            })

        })

    }

 
    deleteProduct(id){

       this.props.deleteProduct(id)

        this.props.history.push({
            pathname: '/',
            search: '?deleted'
        })

    }

    addToProduct(product){

        let cart = this.state.cart;

       if(cart.length === 0){

        
            let newProduct = {

                product,
                quantity : 1

            }

            cart.push(newProduct);
           return this.props.updateCart(this.props.user._id,cart);

        }

        let same = cart.filter(c=>{


            return c.product._id === product._id
            
        })

    
        if(same.length > 0){

            cart[0].quantity++;
            console.log(cart[0].quantity)

        }else{

            let newProduct = {

                product,
                quantity : 1

            }

            cart.push(newProduct);

        }

        this.props.updateCart(this.props.user._id,cart);

        window.location = "/cart"
    }

    render() {

        if(this.props.token === null) return <Redirect to="/" />

        let product = this.state.product;
       
        return (
            <div>

                <h1>{product.name}</h1>
                <h2>{product.price}</h2>
                <h3>{product.description}</h3>
                <Link to={"/user/"+this.state.profile}>{this.state.name}</Link>
                <br/>
                <img src={product.imageUrl} alt=""/>
                <br/><br/>

                    { this.props.user.email == this.state.owner ?  <div><Link className="btn btn-primary" to={"update-product/"+product._id}>Update</Link><button className="btn btn-danger" onClick={()=>this.deleteProduct(product._id)}>Delete</button></div> : <button className="btn btn-primary" onClick={()=>this.addToProduct(product)}>Add To Cart</button> }

            </div>
        )
    }
}

function mapStateToProps(state){

    
    return{

        auth : state.auth.isAuthenticated,
        user : state.auth.user || {name : 'Default', _id : 0},
        token : state.auth.token
    }

}

function mapDispatchToProps(dispatch){

    return{

        deleteProduct : bindActionCreators(deleteProduct,dispatch),
        updateCart : bindActionCreators(updateCart,dispatch)
        
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetails)
