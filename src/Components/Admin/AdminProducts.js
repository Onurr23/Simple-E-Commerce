import React,{Component} from 'react';
import axios from  "axios";
import {Link} from "react-router-dom";
import Categories from './Categories';
import '../../CSS/products.css';


export class AdminProducts extends Component{

    state ={

        products : []

    }

    componentDidMount() {

        console.log(this.props.location.search)

        axios.get('http://localhost:5000').then(products=>{

            this.setState({
                products : products.data
            })

        }).catch(err=>{

            console.log(err)

        })
    }
    render() {

        return (
            <div>

                { this.props.location.search ?

                    <div className="alert alert-info">
                        <p> Product {this.props.location.search === '?deleted' ? 'Deleted' : 'Updated'} !</p>
                    </div> : null
                }

                <div className="row">

                        <div className="col-md-3">

                            <Categories/>
                            
                        </div>

                        <div className="col-md-9">

                            <div className="product">

                            {
                            this.state.products.map(product=>(

                                <div class="card">
                                <img src={product.imageUrl} class="card-img-top avatar" alt="..."/>
                                <div class="card-body">
                                <h5 class="card-title">{product.name}</h5>
                                <p class="card-text">{product.description}</p>
                                    <Link to={"/products/"+product._id} class="btn btn-primary">Details</Link>
                                </div>
                                </div>
                            ))
                        }

                            </div>

                        </div>

                </div>

               
            </div>
        );
    }
}

export default Products;
