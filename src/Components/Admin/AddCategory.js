import React, { Component } from 'react'
import axios from "axios";
import { addCategory } from '../../Redux/Actions/ProductActions';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import {Redirect} from "react-router-dom";

class AddCategory extends Component {


    state={

        name : '',
        description : ''

    }

    onChangeHandler=(e)=>{

        this.setState({

            [e.target.name] : e.target.value

        })

    }

    submitHandler=(e)=>{

        
        e.preventDefault();
        let category = {

            name : this.state.name,
            description : this.state.description

        }

       this.props.addCategory(category);

    }

    render() {

        if(!this.props.auth) return <Redirect to="/" />

        return (
            <div>
                    <form onSubmit={this.submitHandler}>

                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Category Name</label>
                        <input type="text" onChange={this.onChangeHandler} name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Category Description</label>
                        <input type="text" onChange={this.onChangeHandler} name="description" className="form-control" id="exampleInputPassword1"/>
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

        auth : state.auth.isAuthenticated

    }

}

function mapDispatchToProps(dispatch){

    return{

        addCategory : bindActionCreators(addCategory,dispatch)
        
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(AddCategory)

