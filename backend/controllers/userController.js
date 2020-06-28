const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const product = require('../models/product');


exports.signupUser = (req,res,next) =>{

            const name = req.body.name;
            const pic = req.body.pic;
            const email = req.body.email;
            const password = req.body.password;


     if(name === "" && pic === "" && email === "" && password === "")  {

            res.json('ERROR_4');

     }     

    User.findOne({email : req.body.email }).then(user=>{

        if(user){

            res.json('ERROR_1')

        }

        return bcrypt.hash(password,10);
            
    }).then((hashedpassword)=>{


        const newUser = new User({name,pic,email,password : hashedpassword});

            newUser.save().then((user)=>{

                jwt.sign({id : user._id},config.get('jwtSecret'),{expiresIn :3600000},(err,token)=>{ if(err) throw err; res.json({token ,user : {id : user._id, name : user.name, email : user.email}})})

            }).catch(err=>{

                res.json('Error :'+err)

            })

    })

}

exports.signinUser = (req,res,next) =>{

    
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email : email}).then(user=>{

        if(!user){

            res.json('ERROR_2')

        }

        bcrypt.compare(password,user.password).then((result)=>{

            if(result){

                
                jwt.sign({id : user._id},config.get('jwtSecret'),{expiresIn :3600000},(err,token)=>{ if(err) throw err; res.json({token ,user : {id : user._id, name : user.name, email : user.email}})})


            }else{

                res.json('ERROR_3')

            }

        })

       
    }).catch(err=>{

        res.json('Error :' +err);

    })

}


exports.getUser = (req,res,next)=>{

        User.findById(req.user.id).select('-password').then(user=>res.json(user))

}


exports.getProfile = (req,res,next)=>{

    User.findById(req.params.id).select('-password').then(user=>res.json(user))

}


exports.updateCart = (req,res,next)=>{

    User.findOne({_id : req.params.id}).then(product=>{

        product.cart = req.body;

        product.save().then(()=>{

            res.json('SAVED !')

        }).catch(err=>{

            res.json('Error:' + err)
    
        })

    })

}

exports.updateUser = (req,res,next)=>{

    User.findById(req.params.id).then(user=>{

        user.name = req.body.name ? req.body.name : user.name;
        user.password = req.body.password ? req.body.password : user.password;
        user.pic = req.body.pic ? req.body.pic : user.pic ;

        user.save().then(()=>{

            res.json('User Updated !')

        }).catch(err=>{

            res.json('Error :' + err)

        })


    })

}