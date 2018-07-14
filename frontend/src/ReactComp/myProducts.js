import React,{Component} from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Cookies from 'universal-cookie';



class MyProducts extends Component{

    state = {

        result_products : [],
    };

    cookies = new Cookies();


    saveResults = (result_products)=>{

        this.setState({result_products});
    }
    
    componentWillMount(){
        fetch(this.props.myproducts_url + this.props.match.params.id + '/',{
            method:'GET',
            headers: new Headers({
                'Authorization': `JWT ${this.cookies.get("shopnow_jwt_token")}`,
               }),
            })
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)
            this.setState({ result_products : responseJson});

        })
        .catch(e => {console.log (e);});
     }
    
    
    render(){

        return(

            <div class="container">
              <div><br/></div>
              <div class="row">
                {this.state.result_products.map(item => (
                    <div class="col-sm-3">
                        <div class="card mb-3" key={item.id}>
                            <div class="card-body">
                                <Link to = {"/product/"+item.id} Style = "text-decoration: none;color: #000045;">
                                    <div>
                                        <img Style="height: 200px; width: 100%; display: block;" align = "center" src={item.image} alt="Card image"/>

                                            <h5 class="card-title">{item.name}</h5>
                                            <h6 class="card-subtitle text-muted">Brand  : {item.brand}</h6>
                                            <br/>
                                            <h6 class="card-subtitle text-muted">Seller  :  {item.merchant.company_name}</h6>
                                            <br/>
                                            <p>Stock left : {item.stock_left}</p>
                                            <p>&#x20b9;{item.price - ((item.price/100) * item.discount)} <small class="card-subtitle text-muted"><del>&#x20b9;{item.price}</del>  {item.discount}% off </small></p>

                                    </div>
                            
                                </Link>
                                {
                                
                                    (this.cookies.get('shopnow_type') == 2) ?
                                    <Link type="button" class="btn btn-primary" Style="width: 48%;" to = {"/editproduct/" + item.id} onClick={(evt) => this.props.editProduct(evt, item.id, item.merchant.id)}>Edit</Link>
                                    :
                                    <Link type="button" class="btn btn-primary" Style="width: 48%;" to = "/cart" onClick={() => this.props.addToCart(item.id)}>Add to cart</Link>
                                }
                                {
                                    (this.cookies.get('shopnow_type') == 2) ?
                                    <Link type="button" class="btn btn-primary" Style="width: 48%;float : right;" to = "" onClick={(evt) => this.props.deleteProduct(evt, item.id, item.merchant.id)}>Delete</Link>
                                    :
                                    <Link type="button" class="btn btn-primary" Style="width: 48%;float : right;" to = {item.id + "/placeorder"} onClick="">Buy Now</Link>
                                }
                            </div>
                          </div>
                        </div>
                        
                        
                   
                ))}
            
              </div>
            </div>
            



            )

    }

}


export default MyProducts;