import axios from "axios";
import {tokenConfig} from "../Actions/AuthActions"

export function getProducts() {

    return(dispatch)=>{

        axios.get('http://localhost:5000').then(products=>{

            dispatch({type : 'ALL_PRODUCTS',payload : products.data})

        }).catch(err=>{

            console.log(err)

        })


    }

}
export function getProductByCategory(id) {

    return(dispatch)=>{

        axios.get('http://localhost:5000/categories/'+id).then(product=>{

           dispatch({type : 'PRODUCT',payload : product.data})

        }).catch(err=>{

            console.log(err)

        })

    }

}

export function getUserProducts(id) {

    return(dispatch)=>{

        axios.get('http://localhost:5000/profile/products/'+id).then(product=>{

           dispatch({type : 'ALL_PRODUCTS',payload : product.data})

        }).catch(err=>{

            console.log(err)

        })

    }

}

export function addProduct(product){

    return(dispatch,getState)=>{

      axios.post('http://localhost:5000/add-product',product,tokenConfig(getState)).then((product)=>{

            console.log(product.data)      

            dispatch({type : 'PRODUCT_ADDED',payload : 'Product Added Successfully !'})

           // window.location = "/"

        }).catch(err=>{

            console.log(err)

        })

    }

}

export function updateProduct(product,id){

    return(dispatch,getState)=>{
       
        axios.post('http://localhost:5000/products/update/'+id,product,tokenConfig(getState)).then(()=>{

            dispatch({type : 'PRODUCT_UPDATED',payload : 'Product Updated Successfully !'})


        }).catch(err=>{

            console.log(err)

        })

    }

}

export function deleteProduct(id){

    return(dispatch,getState)=>{
       
        axios.delete('http://localhost:5000/delete/'+id,tokenConfig(getState)).then(()=>{

            dispatch({type : 'PRODUCT_DELETED',payload : 'Product Deleted Successfully !'})


        }).catch(err=>{

            console.log(err)

        })

    }

}

export function addCategory(category){

    return(dispatch,getState)=>{
       
        axios.post('http://localhost:5000/admin/add-category',category,tokenConfig(getState)).then(()=>{

            dispatch({type : 'CATEGORY_ADDED',payload : 'Category Added Successfully !'})

            window.location = "/"

        }).catch(err=>{

            console.log(err)

        })

    }

}

export default {getProducts,getProductByCategory,addProduct,addCategory,deleteProduct,getUserProducts}