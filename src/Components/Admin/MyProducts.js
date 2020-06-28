import React,{Component} from 'react';
import {Link} from "react-router-dom";
import Categories from '../Shop/Categories';
import '../../CSS/products.css';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {deleteProduct,getUserProducts} from "../../Redux/Actions/ProductActions";
import axios from "axios";
import {Redirect} from "react-router-dom";

export class Products extends Component{

    state = {

        show : false,
        prodcuts : []

    }

    componentDidMount() {

        axios.get('http://localhost:5000/profile/products/'+this.props.match.params.id).then(products=>{

            this.setState({

                products : products.data

            })

        }).catch(err=>{

            console.log(err)

        })

        
        if(this.props.location.search){

            this.setState({

                show : true

            })

        }

        setTimeout(()=>{

            this.setState({

                show : false

            })


        },5000)

    }

    
    renderProducts(){
        let products = this.state.products;
        return(
            <div>
                <ul>
                {
                
                products.map(product=>(
    
                                    <div className="card my-3">
                                        <img src={product.imageUrl} alt="" class="card-img-top"/>
                                        <div className="card-body">
                                            <h4 className="card-title">
                                            <Link to={'/products/'+product._id}>{product.name}</Link>
                                            </h4>
                                            <p className="card-text pt-2">
                                               
                                            </p>
                                        </div>
                                        <div className="card-footer">
                                            <Link className="btn btn-primary" to={"/products/update-product/"+product._id}>Update</Link>
                                        </div>
                                    </div>
    
                              
                                ))
                            }
                </ul>
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

        if(this.props.token === null) return <Redirect to="/" />

        let products = this.state.products;

        return (
            <div>

                <br/><br/>

                { this.state.show ?

                    <div className="alert alert-info">
                        <p> Product {this.props.location.search === '?deleted' ? 'Deleted' : 'Updated'} !</p>
                    </div> : null
                }

                <div className="row">

                        {products ? this.renderProducts() : this.renderEmpty() }
                        
                </div>

            </div>
        );
    }
}
function mapStateToProps(state) {

    return{

        products: state.ProductReducer,
        auth : state.auth.user,
        token : state.auth.token

    }

}

function mapDispatchToProps(dispatch) {
    
    return{

        getProducts : bindActionCreators(getUserProducts,dispatch),
        deleteProduct : bindActionCreators(deleteProduct,dispatch)

    }

}
export default connect(mapStateToProps,mapDispatchToProps)(Products);
