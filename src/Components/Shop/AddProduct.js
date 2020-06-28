import React, { Component } from 'react'
import axios from "axios";
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import {Redirect} from "react-router-dom";
import { addProduct } from '../../Redux/Actions/ProductActions';

class AddProduct extends Component {

    state={

        name : '',
        price :'',
        description : '',
        imageUrl : '',
        category : '',
        categories : []

    }

    componentDidMount() {

        axios.get("http://localhost:5000/admin/categories").then((categories)=>{

            this.setState({

                categories : categories.data

            })

        })

    }

    onChangeHandler=(e)=>{

        this.setState({

            [e.target.name] : e.target.value

        })

    }

    submitHandler=(e)=>{

        e.preventDefault();
        let product = {

            name : this.state.name,
            price : this.state.price,
            description : this.state.description,
            imageUrl: this.state.imageUrl,
            category : this.state.category,
            userId : this.props.user._id

        }

        this.props.addProduct(product);

        window.location = "/";

    }

    render() {

        if(!this.props.auth) return <Redirect to="/" />

        let categories = this.state.categories;

        return (
            <div>
                    <form onSubmit={this.submitHandler} encType="multipart/form-data"> 

                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Product Name</label>
                        <input type="text" onChange={this.onChangeHandler} name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Product Price</label>
                        <input type="text" onChange={this.onChangeHandler} name="price" className="form-control" id="exampleInputPassword1"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Product Description</label>
                        <input type="text" onChange={this.onChangeHandler} name="description" className="form-control" id="exampleInputPassword1"/>
                    </div>

                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Category</label>
                            <select name="category" className="form-control" id="exampleFormControlSelect1" onChange={this.onChangeHandler}>

                                <option>-</option>
                                {
                                    categories.map(category=>(

                                        <option key={category._id} value={category._id}>{category.name}</option>

                                    ))
                                }

                            </select>
                        </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Product Image</label>
                        <input type="text" onChange={this.onChangeHandler} name="imageUrl" className="form-control" id="exampleInputPassword1"/>
                    </div>

                    <div className="form-group">

                        <img className="img-fluid" src={this.state.imageUrl} alt=""/>

                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>

                    </form>
            </div>
        )
    }
}

function mapStateToProps(state){

    return{

        auth : state.auth.isAuthenticated,
        user : state.auth.user
    }

}

function mapDispatchToProps(dispatch){

    return{

        addProduct : bindActionCreators(addProduct,dispatch)
        
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(AddProduct)
