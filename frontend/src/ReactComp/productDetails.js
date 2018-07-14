import React,{Component} from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Cookies from 'universal-cookie';

class ProductDetails extends Component{

    state = {

        result_products : [],
    };

    cookies = new Cookies();


    saveResults = (result_products)=>{

        this.setState({result_products});
    }
    
    componentDidMount(){
        fetch(this.props.product_details_url + this.props.match.params.id + '/',{
            method:'GET',
            })
        .then(response => {
            if (response.ok) {
                    return response.json();
                  } else {
                    
                    var error = new Error(response.statusText);
                    error.response = response;
                    console.log(response.statusText);
                    alert(error,response.statusText);
                    throw error
                  }    
        })
        .then(responseJson => {
            this.setState({ result_products : responseJson});

        })
        .catch(e => {console.log (e);});
     }
    

    
    
    render(){
        
        return(

            <div class="container">
              <div><br/></div>
                {this.state.result_products.map(item => (
                    <div class="row" key={item.id}>
                        
                        <div class="col-sm-5">
                            <img Style="height:auto;width: 100%;" src={item.image} alt="Card image"/>
                            <div><br/></div>
                            {
                                
                                (this.cookies.get('shopnow_type') == 2) ?
                                <Link type="button" class="btn btn-primary" Style="width: 48%;" to = {"/editproduct/" + item.id} onClick={(evt) => this.props.editProduct(evt, item.id, item.merchant.id)}>Edit Product</Link>
                                :
                                <Link type="button" class="btn btn-primary" Style="width: 48%;" to = "/cart" onClick={(evt) => this.props.addToCart(evt, item.id, this.props.history)}>Add to cart</Link>
                            }
                            {
                                (this.cookies.get('shopnow_type') == 2) ?
                                <Link type="button" class="btn btn-primary" Style="width: 48%;float : right;" to = "" onClick={(evt) => this.props.deleteProduct(evt, item.id, item.merchant.id)}>Delete Product</Link>
                                :
                                <Link type="button" class="btn btn-primary" Style="width: 48%;float : right;" to = {"/" + item.id + "/placeorder"} >Buy Now</Link>
                            }
                        </div> 
                        <div class="col-sm-7">
                            <h3>{item.name}</h3>
                            <pre>Brand: {item.brand}</pre>
                            <p>&#x20b9;{item.price - ((item.price/100) * item.discount)} <small class="card-subtitle text-muted"><del>&#x20b9;{item.price}</del>  {item.discount}% off </small></p>
                            <pre>Stock Left: {item.stock_left}</pre>
                            <h4>Seller:</h4>
                            <pre>{item.merchant.company_name}    {item.merchant.company_email   }</pre>
                            <h4>Description:</h4>
                            <pre>{item.description}</pre>
                            <h4>Specification:</h4>
                            <pre>{item.specification}</pre>
                        </div> 
                    
                    </div>
                    
                ))}
                <br/><br/><br/>
            </div>
            



            )

    }

}


export default ProductDetails;