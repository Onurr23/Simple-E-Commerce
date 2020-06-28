const Category = require('../models/category');


exports.getCategories = (req,res,next)=>{


    Category.find().then(categories=>{

        res.json(categories)

    }).catch(err=>{

        console.log(err)

    })

}

exports.addCategory = (req,res,next)=> {

   let name = req.body.name;
   let description = req.body.description;

   let newCategory = new Category({name,description})

   newCategory.save().then(()=>{

        res.json('Category Added !')

   }).catch(err=>{

    res.json('Error :' + err)

   })
}

exports.updateCategory = (req,res,next)=>{

    Category.find(req.params.id).then(category=>{

        category.name = req.body.name,
        category.description = req.body.description

    })

    category.save().then(()=>{

        res.json('Category Updated').catch(err=>{
            res.json('Error :' + err)
        })
    })
}
