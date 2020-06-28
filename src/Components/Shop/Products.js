import React,{Component} from 'react';
import {Link} from "react-router-dom";
import Categories from './Categories';
import '../../CSS/products.css';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getProducts} from "../../Redux/Actions/ProductActions";


export class Products extends Component{

    componentDidMount() {

        this.props.getProducts()

    }
    render() {

        return (
            <div>

                <div className="banner">

                </div>

                { this.props.location.search ?

                    <div className="alert alert-info">
                        <p> Product {this.props.location.search === '?deleted' ? 'Deleted' : 'Updated'} !</p>
                    </div> : null
                }

                <div className="row">

                        <div className="col-md-3">

                            <Categories/>

                        </div>
                            {
                            this.props.products.map(product=>(

                                <div key={product._id} className="col-md-4">

                                <div key={product._id} className="card my-3">
                                    <img src={product.imageUrl} alt="" className="card-img-top"/>
                                    <div className="card-body">
                                        <h4 className="card-title">
                                        <Link to={'/products/'+product._id}>{product.name}</Link>
                                        </h4>
                                        <p className="card-text pt-2">
                                            {product.description}
                                        </p>
                                    </div>
                                    <div className="card-footer">
                                        <small className="text-muted">
                                            <i className="fas fa-lira-sign"></i>
                                            {product.price}
                                        </small>
                                        <Link to={'/products/'+product._id} className="btn btn-secondary btn-sm float-right">
                                            <i className="fa fa-angle-double-right"></i>
                                            Details
                                        </Link>
                                    </div>
                                </div>

                            </div>
                            ))
                        }
                </div>

            </div>
        );
    }
}
function mapStateToProps(state) {

    return{

        products: state.ProductReducer

    }

}

function mapDispatchToProps(dispatch) {
    return{

        getProducts : bindActionCreators(getProducts,dispatch)

    }

}
export default connect(mapStateToProps,mapDispatchToProps)(Products);
