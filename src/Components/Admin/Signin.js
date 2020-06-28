import axios from "axios";
import React, { Component } from 'react';
import { signin } from "../../Redux/Actions/AuthActions";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Redirect} from "react-router-dom";

class Signin extends Component {

    state={

        email : '',
        password :''

    }

    onChangeHandler=(e)=>{

        this.setState({

            [e.target.name] : e.target.value

        })

    }

    submitHandler=(e)=>{

        e.preventDefault();

        let user = {

            email : this.state.email,
            password : this.state.password

        }

        this.props.signin(user);


    }


    render() {

        let message = this.props.message;

       
        if(this.props.auth) return <Redirect to="/" />

        return (
            <div>
                
                <br/>
                { typeof message == "string" ? <div className="alert alert-danger"> {message} </div> : null}

                <form onSubmit={this.submitHandler}>

                <div class="form-group">
                    <label for="exampleInputEmail1">Email Adress</label>
                    <input type="email" onChange={this.onChangeHandler} name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>

                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" onChange={this.onChangeHandler} name="password" class="form-control" id="exampleInputPassword1"/>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>

                </form>
            </div>
        )
    }
}

function mapStateToProps(state){

    return{

        auth : state.auth.isAuthenticated,
        message : state.error.msg

    }

}

function mapDispatchToProps(dispatch){

    return{

        signin : bindActionCreators(signin,dispatch)

    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Signin)
