import React, { Component } from 'react'
import axios from "axios";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getProductByCategory} from "../../Redux/Actions/ProductActions";
import "../../CSS/categories.css";


class Categories extends Component {

    state = {

        categories : [],
        selectedCategory : {}

    }

    componentDidMount(){

        axios.get('http://localhost:5000/admin/categories').then(categories=>{

            this.setState({

                categories : categories.data

            })

        }).catch(err=>{

            console.log(err)

        })

    }

    selectCategory(category){

        this.setState({

            selectedCategory : category

        })

       this.props.getProducts(category._id)

    }

    render() {
        return (
            <div>

                <ul className="list-group">
                    {
                        this.state.categories.map(category=>(

                        <li key={category._id} onClick={()=>this.selectCategory(category)} className={`list-group-item ${this.state.selectedCategory===category ? 'active' : '' } `}>
                            <a className="pointer">{category.name}</a> </li>

                        ))

                    }

                </ul>

            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {

    return{

        getProducts : bindActionCreators(getProductByCategory,dispatch)

    }

}

export default connect(null,mapDispatchToProps)(Categories);
