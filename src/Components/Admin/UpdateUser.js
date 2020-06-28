import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Redirect} from "react-router-dom";
import { updateUser } from '../../Redux/Actions/ProfileActions';



class UpdateUser extends Component {

    state={

        name : '',
        pic : '',
       
    }
    componentDidMount() {

        axios.get('http://localhost:5000/profile/'+this.props.match.params.id).then(user=>{

        console.log(user)
       
            this.setState({

                name : user.data.name,
                pic : user.data.description,
                
            })

        

        }).catch(err=>{

            console.log(err)

        })


    }


    onChangeHandler=(e)=>{

        this.setState({

            [e.target.name] : e.target.value

        })

    }

    submitHandler=(e)=>{

        e.preventDefault();

        let newUser = {

            name : this.state.name,
            pic : this.state.pic,

        }

        this.props.updateUser(this.props.match.params.id)

        
        this.props.history.push({

            pathname : '/'

        })

    }

    render() {

        if(this.props.token === null) return <Redirect to="/" />

        return (
            <div>
                    <form onSubmit={this.submitHandler}>

                    <div class="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.onChangeHandler} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1">Product Image</label>
                        <input type="text" name="imageUrl" value={this.state.pic} onChange={this.onChangeHandler} class="form-control" id="exampleInputPassword1"/>
                    </div>

                    <div className="form-group">

                        <img src={this.state.pic} alt=""/>

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
        user : state.auth.user || {name : 'Default'},
        token : state.auth.token

    }

}

function mapDispatchToProps(dispatch){

    return{

      updateUser : bindActionCreators(updateUser,dispatch)
        
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateUser)
