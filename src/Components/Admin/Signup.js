import React, { Component } from 'react'
import axios from "axios";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { register } from '../../Redux/Actions/AuthActions';


class Signup extends Component {

    state={

        name : "",
        pic : "",
        email : '',
        password :'',
        passwordAgain : ''

    }


    onChangeHandler=(e)=>{

        this.setState({

            [e.target.name] : e.target.value

        })

    }

    submitHandler=(e)=>{

        e.preventDefault();

        if(this.state.password === this.state.passwordAgain){

            
        let user = {

            name : this.state.name,
            pic : this.state.pic,
            email : this.state.email,
            password : this.state.password

        }

        this.props.signup(user);


        }else{

            alert('Passwords are Not Matching !')

        }

    }

    render() {

        let message = this.props.message

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

                <div class="form-group">
                    <label for="exampleInputPassword1">Password Confirm</label>
                    <input type="password" onChange={this.onChangeHandler} name="passwordAgain" class="form-control" id="exampleInputPassword1"/>
                </div>

                <div class="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input type="text" onChange={this.onChangeHandler} name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>

                <div className="form-group">

                    <img src={this.state.pic} alt=""/>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>

                </form>

                {this.state.show ?<div className="alert alert-danger"> {this.state.message} </div> : null }

                
            </div>
        )
    }
}

function mapStateToProps(state){

    return{

        message : state.error.msg

    }

}

function mapDispatchToProps(dispatch){

    return{

        signup : bindActionCreators(register,dispatch)

    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Signup)