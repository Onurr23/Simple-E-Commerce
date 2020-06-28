import React, { Component } from 'react'
import axios from 'axios';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import {Link} from "react-router-dom";
import { getProfile } from '../../Redux/Actions/ProfileActions';

class User extends Component {

    state = {

        profile :{},
        products : []

    }

    componentDidMount(){

        this.props.getProfile(this.props.match.params.id);

        axios.get('http://localhost:5000/profile/products/'+this.props.match.params.id).then(products=>{

        console.log(products)

            this.setState({

                products : products.data

            })

        }).catch(err=>{

            console.log(err)

        })
       
    }

    render() {

        let profile = this.props.profile;
        let products = this.state.products;

        return (
            <div>
                <h1>{profile.name}</h1>
                <h2>{profile.email}</h2>
                <img src={profile.imageUrl} alt=""/>
                <ul>
                    {
                        products.map(product=>(
                            <li>
                                <Link to={"/products/"+product._id}>{product.name}</Link>
                                <p>{product.price}</p>
                                <img src={product.imageUrl} alt=""/>
                            </li>
                        ))
                    }
                </ul>
                <img src="" alt=""/>
            </div>
        )
    }
}
function mapStateToProps(state){

    return{

        profile : state.profile

    }

}

function mapDispatchToProps(dispatch){

    return{

       getProfile : bindActionCreators(getProfile,dispatch)

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(User)
