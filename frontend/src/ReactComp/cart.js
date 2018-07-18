import React,{Component} from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import {cloneDeep} from 'lodash';

class Cart extends Component{
    
    
    state = {
        cart_results : [],
    }
    
    cookies = new Cookies();

    componentWillMount(){
        fetch(this.props.cart_url,{
            method:'GET',
            headers: new Headers({
                 'Authorization': `JWT ${this.cookies.get("shopnow_jwt_token")}`,
               }),
            })
        .then(response => {
            if (response.ok) {
                    return response.json();
                  } else {
                    
                    var error = new Error(response.statusText);
                    error.response = response;
                    alert(error,response.statusText);
                    throw error
                  }
        })
        .then(responseJson => {
            console.log(responseJson);
            this.setState({ cart_results : responseJson});

        })
        .catch(e => {alert(e);});
    }


    deleteFromCart = (evt, cart_id) => {
        fetch(this.props.deletecart_url + cart_id + '/',{
                method:'DELETE',
                headers: new Headers({
                     'Authorization': `JWT ${this.cookies.get("shopnow_jwt_token")}`,
                     'Content-Type': 'application/json',
                   }),
            })
            .then(response => {
                
                if (response.ok) {
                    this.props.history.goBack();
                  } else {
                    var error = new Error(response.statusText);
                    error.response = response;
                    alert(error,response.statusText);
                    throw error
                  }
            })
            .catch(e => {alert(e);});
    }
    
    
    changeCartCount = (cart_id, count, index) => {
        let formData = new FormData();
        
        formData.append("count" , count);
        
        fetch(this.props.editcart_url+ cart_id + '/',{
            method:'PATCH',
            headers: new Headers({
                 'Authorization': `JWT ${this.cookies.get("shopnow_jwt_token")}`,
                 'Accept': 'application/json',
               }),
            body : formData,
        })
        .then(response => {
                if (response.ok) {
                    return response.json();
                  } else {
                    var error = new Error(response.statusText);
                    error.response = response;
                    alert(error,response.statusText);
                    throw error
                  }
            })
        .then(responseJson => {
            let cart_results = this.state.cart_results;
            cart_results[index].count = count;
            this.setState({cart_results}, () => {cart_results : cart_results});

        })
        .catch(e => {alert(e);});
    }
    
    incrementCart = (evt, cart_id, cur_count, index) =>{
        this.changeCartCount(cart_id, cur_count + 1, index);
    }
    
    decrementCart = (evt, cart_id, cur_count, index) =>{
        this.changeCartCount(cart_id, cur_count - 1, index);
    }

    render(){
        const options = {year: 'numeric', month: 'long', day: 'numeric' };
        return(
            <div class="container">
              <div><br/></div>
              <div class="card-header" Style = "width:900px;margin:auto;" align = "center"><h5><b>My Cart</b></h5></div>
              <div><br/></div>
              
                {this.state.cart_results.map((item, index) => (
                    <div class="w3-container" align='center'>
                          <div class="w3-card-4" Style="width:70%">
                                <div class="w3-container" align="left">
                                    <div class="row" key={item.id}>
                                        <div class="col-sm-3">
                                            <br/>
                                            <img src={item.product.image} alt="Avatar" class="w3-round" Style="width:80%"/>
                                            <div class="col-sm-8" Style="margin: auto;">
                                                    <br/>
                                                    <button class="btn btn-primary btn-sm disabled" onClick={(evt) => this.decrementCart(evt, item.id, item.count, index)}>-</button>
                                                    &nbsp;&nbsp;
                                                    <label> {item.count} </label>
                                                    &nbsp;&nbsp;
                                                    <button class="btn btn-primary btn-sm disabled" onClick={(evt) => this.incrementCart(evt, item.id, item.count, index)}>+</button>
                                                </div>
                                        </div> 
                                        <div class="col-sm-5">
                                            <p><h3>{item.product.name}</h3></p>
                                            <p>Seller  :  {item.product.merchant.company_name}</p>
                                            <p>&#x20b9;{item.product.price - ((item.product.price/100) * item.product.discount)} <small class="card-subtitle text-muted"><del>&#x20b9;{item.product.price}</del>  {item.product.discount}% off </small></p>
                                            {
                                                item.product.stock_left <= 0 ?
                                                <div>
                                                    <p class="badge badge-warning" Style = "font-size:15px">Out Of Stock</p>
                                                    <br/>
                                                </div>
                                                
                                                :
                                                <p>Stock left : {item.product.stock_left}</p>
                                            }
                                            <button class = "btn btn-primary" onClick={(evt) => this.deleteFromCart(evt, item.id)} >Remove from cart</button>
                                            
                                        </div> 
                                        <div class="col-sm-4">
                                            <p>date added : {new Date(item.date_added).toLocaleDateString("en-US", options)}</p>
                                            <p>total : &#x20b9;{(item.product.price - ((item.product.price/100) * item.product.discount)) * item.count}</p>
                                            <Link class = "btn btn-primary"  to={item.product.id + "/placeorder/" + item.count} >Place order</Link>
                                        </div> 
                                    </div>
                                    <br/>
                                </div>
                          </div>
                        <br/>
                    </div>
                ))}
                
                 
              
                
                
                
                
                
            </div>
        )
    }


}

export default Cart;