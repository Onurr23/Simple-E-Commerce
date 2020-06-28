import React, { Component } from 'react'
import axios from 'axios';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import getProfile from '../../Redux/Actions/ProfileActions';
import {Link} from "react-router-dom";
import {Redirect} from "react-router-dom";

class Profile extends Component {

    state = {

        products : []

    }

    componentDidMount(){

        
        axios.get('http://localhost:5000/profile/products/'+this.props.match.params.id).then(products=>{

           
            this.setState({

                products : products.data

            })

        }).catch(err=>{

            console.log(err)

        })
       
    }

    renderProducts(){
        let products = this.state.products;
        return(
            <div>
                <ul>
                    {products.map(product=>(
                    <li>
                        <Link to={"/products/"+product._id}>{product.name}</Link>
                         <p>{product.price}</p>
                        <img src={product.imageUrl} alt=""/>
                    </li>

                    ))}
                </ul>

                    <Link to={"/update-user/"+this.props.match.params.id} className="btn-btn-primary">Update Your Profile</Link>

            </div>
        )

    }

    renderEmpty(){

        return(
            <div>
                <h3>You Did Not Add Any Product !</h3>
            </div>
        )

    }

    render() {

        let user = this.props.user;
       
        if(!this.props.auth) return <Redirect to="/" />

        return (
            <div>
                <h1>{user.name}</h1>
                <h2>{user.email}</h2>
                <img src={user.imageUrl} alt=""/>
                {this.state.products ? this.renderProducts() : this.renderEmpty() }
                
                <img src="" alt=""/>
            </div>
        )
    }
}
function mapStateToProps(state){

    return{

        user : state.auth.user || {email :'', name : '', pic : ''},
        auth : state.auth.isAuthenticated

    }

}

function mapDispatchToProps(dispatch){

    return{

      

    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Profile)
