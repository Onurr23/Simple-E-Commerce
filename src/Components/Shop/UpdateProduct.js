import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Redirect} from "react-router-dom";
import { updateProduct, deleteProduct } from '../../Redux/Actions/ProductActions';


class UpdateProduct extends Component {

    state={

        name : '',
        price :'',
        description : '',
        imageUrl : '',
        category : '',
        categories : [],
        owner : '',
        id : ''

    }
    componentDidMount() {

        axios.get('http://localhost:5000/products/'+this.props.match.params.id).then(product=>{

       
            this.setState({

                name : product.data.name,
                price : product.data.price,
                description : product.data.description,
                category : product.data.category,
                imageUrl : product.data.imageUrl,
                owner : product.data.userId,
                id : product.data._id
            })

        

        }).catch(err=>{

            console.log(err)

        })

        axios.get("http://localhost:5000/admin/categories").then((categories)=>{

            this.setState({

                categories : categories.data

            })

        })

    }

    deleteProduct(id){

        this.props.deleteProduct(id)
 
         this.props.history.push({
             pathname: '/myproducts',
             search: '?deleted'
         })
 
     }

    onChangeHandler=(e)=>{

        this.setState({

            [e.target.name] : e.target.value

        })

    }

    submitHandler=(e)=>{

        e.preventDefault();

        let newProduct = {

            name : this.state.name,
            price : this.state.price,
            description : this.state.description,
            category: this.state.category,
            imageUrl : this.state.imageUrl

        }

        this.props.updateProduct(newProduct,this.props.match.params.id);

        this.props.history.push({

            pathname : '/myproducts',
            search : '?updated'

        })

    }

    render() {

        if(this.props.token === null) return <Redirect to="/" />

        let categories = this.state.categories
    
        return (
            <div>
                    <form onSubmit={this.submitHandler}>

                    <div class="form-group">
                        <label for="exampleInputEmail1">Product Name</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.onChangeHandler} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1">Product Price</label>
                        <input type="text" name="price" value={this.state.price} onChange={this.onChangeHandler} class="form-control" id="exampleInputPassword1"/>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1">Product Description</label>
                        <input type="text" name="description" value={this.state.description} onChange={this.onChangeHandler} class="form-control" id="exampleInputPassword1"/>
                    </div>

                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Category</label>
                            <select name="category" className="form-control" id="exampleFormControlSelect1" onChange={this.onChangeHandler}>

                                <option>-</option>
                                {
                                    categories.map(category=>(

                                        <option key={category._id} selected={`${category._id===this.state.category ? "true" : "false"}`} value={category._id}>{category.name}</option>

                                    ))
                                }

                            </select>
                        </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1">Product Image</label>
                        <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onChangeHandler} class="form-control" id="exampleInputPassword1"/>
                    </div>

                    <div className="form-group">

                        <img src={this.state.imageUrl} alt=""/>

                    </div>

                    <button type="submit" class="btn btn-primary">Submit</button>
                    <button className="btn btn-danger" onClick={()=>this.deleteProduct(this.state.id)}>Delete</button>

                    </form>
            </div>
        )
    }
}

function mapStateToProps(state){

    
    return{

        auth : state.auth.isAuthenticated,
        user : state.auth.user || {name : 'Default'},
        token : state.auth.token

    }

}

function mapDispatchToProps(dispatch){

    return{

        updateProduct : bindActionCreators(updateProduct,dispatch),
        deleteProduct : bindActionCreators(deleteProduct,dispatch)
        
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateProduct)
