const Product = require('../models/product');

exports.getProducts = (req,res,next)=>{

    
    Product.find().then(products=>{

        res.json(products)

    }).catch(err=>{

        res.status(400).json('Error :' + err);

    })

   
}

exports.getProductsByCategoryId = (req,res,next)=>{

    const categoryid = req.params.id;


    Product.find({category : categoryid}).then(products=>{

        res.json(products)

    }).catch(err=>{

        res.json('Err:' + err);

    })
}

exports.addProduct = (req,res,next) =>{

    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const category = req.body.category;
    const userId = req.body.userId;
    
    const newProduct = new Product({name,price,description,imageUrl,category,userId});

    newProduct.save().then(()=>{

        res.json('Product Added !')

    }).catch(err=>{

        res.json('Error :' + err)

    })

}

exports.deleteProduct = (req,res,next)=>{

    Product.findByIdAndDelete(req.params.id).then(()=>{

        req.query.action = "deleted";
        res.json('Product Deleted !')

    }).catch(err=>{

        res.json('Error:' + err)

    })

}

exports.updateProduct = (req,res,next)=>{

    Product.findById(req.params.id).then(product=>{

        product.name = req.body.name;
        product.price = req.body.price;
        product.description = req.body.description;
        product.imageUrl = req.body.imageUrl;
        product.category = req.body.category;

        product.save().then(()=>{

            res.json('Product Updated')

        }).catch(err=>{

            res.json('Error:' + err)

        })

    })

}

exports.getProduct = (req,res,next)=>{

    Product.findById(req.params.id).populate('userId',"-password").then(product=>{

        res.json(product)

    }).catch(err=>{

        res.json('Error :' + err)

    })

}

exports.getUserProducts = (req,res,next)=>{

    Product.find({userId : req.params.id}).select('name price imageUrl').then(product=>{

        res.json(product)

    }).catch(err=>{

        res.json(err)

    })

}


