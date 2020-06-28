import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { bindActionCreators } from 'redux';
import AddCategory from './Components/Admin/AddCategory';
import Signin from './Components/Admin/Signin';
import Signup from './Components/Admin/Signup';
import Navbar from './Components/Main/Navbar';
import AddProduct from "./Components/Shop/AddProduct";
import ProductDetails from "./Components/Shop/ProductDetails";
import Products from "./Components/Shop/Products";
import UpdateProduct from "./Components/Shop/UpdateProduct";
import { loadUser } from "./Redux/Actions/AuthActions";
import User from './Components/Main/User';
import Profile from './Components/Main/Profile';
import MyProducts from './Components/Admin/MyProducts';
import Cart from './Components/Shop/Cart';
import UpdateUser from './Components/Admin/UpdateUser';


class App extends Component {

  componentDidMount(){

    this.props.loadUsers();

  }
st
  render() {
    return (
      <div>

        <Navbar/>

      <div className="container">
            <Switch>

                <Route exact path="/" component={Products} />
                <Route exact path="/add-product" component={AddProduct} />
                <Route exact path="/products/update-product/:id" component={UpdateProduct} />
                <Route exact path="/products/:id" component={ProductDetails} />
                <Route exact path="/admin/add-category" component={AddCategory} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/user/:id" component={User} />
                <Route exact path="/profile/:id" component={Profile} />
                <Route exact path="/myproducts/:id" component={MyProducts} />
                <Route exact path="/cart" component={Cart}/>
                <Route exact path="/update-user/:id" component={UpdateUser}/>
            </Switch>

            </div>

      </div>
    
    )
  }
}

function mapStateToProps(state){

  console.log(state)

  return{

  }

}

function mapDispatchToProps(dispatch){

  return{

    loadUsers : bindActionCreators(loadUser,dispatch)

  }

}

export default connect(mapStateToProps,mapDispatchToProps)(App)


