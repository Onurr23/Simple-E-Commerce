import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import { logout } from '../../Redux/Actions/AuthActions';

class Navbar extends Component {


    logout(){


        this.props.logout();

        window.location = "/signin"
        

    }

    render() {

        let user = this.props.user;

        return (
            <div>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand" href="#">SHOP</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
            
                    {this.props.auth ? <li className="nav-item"><Link to="/add-product" className="nav-link">Add Product</Link></li> : null }
                    
                    {!this.props.auth ?  <li className="nav-item"><Link to="/signin" className="nav-link">Signin</Link></li>  : null }

                    {!this.props.auth ?  <li className="nav-item"><Link to="/signup" className="nav-link">Signup</Link></li>  : null }

                    {this.props.auth ? <li className="nav-item"><Link to={"/myproducts/"+user._id} className="nav-link">My Products</Link></li> : null}

                    {this.props.auth ? <li className="nav-item"><Link to={"/profile/"+user._id} className="nav-link">Profile</Link></li> : null}

                    {this.props.auth ? <li className="nav-item"><Link to="/cart" className="nav-link">Cart</Link></li> : null}

                    {this.props.auth ? <li className="nav-item"><a className="nav-link" onClick={this.props.logout}>Logout</a></li> : null}
                    
                </ul>
            </div>
            </nav>

            </div>
        )
    }
}

function mapStateToProps(state){

    
    return{

        auth : state.auth.isAuthenticated,
        user : state.auth.user || {email :'', name : '', pic : ''}

    }

}

function mapDispatchToProps(dispatch){

    return{

        logout : bindActionCreators(logout,dispatch)

    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)
