import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';


import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Redirect} from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Cookies from 'universal-cookie';
import {Navigation} from 'react-router';


   


import HeaderComponent from './ReactComp/header'
import Login from './ReactComp/login'
import SignUp from './ReactComp/signUp'
import AddProduct from './ReactComp/addproduct'
import Products from './ReactComp/products'
import MyProducts from './ReactComp/myProducts'
import ProductDetails from './ReactComp/productDetails'
import EditProduct from './ReactComp/editProduct'
import Cart from './ReactComp/cart'
import PlaceOrder from './ReactComp/placeOrder'
import Orders from './ReactComp/orders'
import MerchantOrders from './ReactComp/merchantOrders'
import Profile from './ReactComp/profile'
import About from './ReactComp/about'

class App extends Component {
    
    //server_url = "http://18.222.137.198:8000/";
    //server_url : "http://18.222.137.198:8000/";


    state = {
        isLoggedIn : false,
        tokenValidity : 1 * 24 * 60 * 60 *1000,
        reload : false,
        
        
        
        
        
        
        login_url : "http://18.222.137.198:8000/token-auth/",
        userDetails_url : "http://18.222.137.198:8000/shopnow/userdetails/",
        merchant_signup_url : "http://18.222.137.198:8000/shopnow/addmerchant/",
        customer_signup_url : "http://18.222.137.198:8000/shopnow/addcustomer/",
        
        addproduct_url : "http://18.222.137.198:8000/shopnow/addproduct/",
        editproduct_url : "http://18.222.137.198:8000/shopnow/editproduct/",
        deleteproduct_url : "http://18.222.137.198:8000/shopnow/deleteproduct/",
        
        products_url : "http://18.222.137.198:8000/shopnow/products",
        productdata_url : "http://18.222.137.198:8000/shopnow/product/",
        product_details_url : "http://18.222.137.198:8000/shopnow/productdetails/",
        myproducts_url : "http://18.222.137.198:8000/shopnow/myproducts/",
        
        addtocart_url : "http://18.222.137.198:8000/shopnow/addcart/",
        cart_url : "http://18.222.137.198:8000/shopnow/cart/",
        deletecart_url : "http://18.222.137.198:8000/shopnow/deletecart/",
        editcart_url : "http://18.222.137.198:8000/shopnow/editcart/",
        
        placeorder_url : "http://18.222.137.198:8000/shopnow/placeorder/",
        orders_url : "http://18.222.137.198:8000/shopnow/orders/",
        deleteorder_url : "http://18.222.137.198:8000/shopnow/editorder/",
        merchantorders_url : "http://18.222.137.198:8000/shopnow/myorders/",
        
        customerprofile_url : "http://18.222.137.198:8000/shopnow/viewcustomer/",
        merchantprofile_url : "http://18.222.137.198:8000/shopnow/viewmerchant/",
        editcustomer_utl : "http://18.222.137.198:8000/shopnow/editcustomer/",
        editmerchant_url : "http://18.222.137.198:8000/shopnow/editmerchant/"
    }

    componentWillMount(){
                
        let token = this.cookies.get('shopnow_jwt_token');
        if (!(typeof token === 'undefined'))
        {
            this.toggleLoggedIn();

        }
    }

    cookies = new Cookies();
    
    
    reload = () =>{
        this.setState(prev => ({reload : !prev.reload}));
    }

    toggleLoggedIn = () =>{
        this.setState(prev => ({isLoggedIn : !prev.isLoggedIn}));
    }    
    
    
    login = (token) =>{
        
        fetch(this.state.userDetails_url,{
            method:'GET',
            headers: new Headers({
             'Authorization': `JWT ${token}`,
             'Content-Type': 'application/x-www-form-urlencoded',
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
            this.cookies.set('shopnow_jwt_token', token, { path: '/',expires: new Date(Date.now()+ this.state.tokenValidity)} );
            this.cookies.set('shopnow_username', responseJson[0]["username"], { path: '/',expires: new Date(Date.now()+ this.state.tokenValidity)} );
            this.cookies.set('shopnow_id', responseJson[0]["p_id"], { path: '/',expires: new Date(Date.now()+ this.state.tokenValidity)} );
            this.cookies.set('shopnow_type', responseJson[0]["type"], { path: '/',expires: new Date(Date.now()+ this.state.tokenValidity)} );
            this.cookies.set('shopnow_status', responseJson[0]['status'], { path: '/',expires: new Date(Date.now()+ this.state.tokenValidity)} );
            
    
            this.toggleLoggedIn();
            
            
        })
        .catch(e => {alert(e);});

    }
    
    logout = () =>{
        
        new Cookies().remove('shopnow_jwt_token', {path:"/"});
        new Cookies().remove('shopnow_username', {path:"/"});
        new Cookies().remove('shopnow_id', {path:"/"});
        new Cookies().remove('shopnow_status', {path:"/"});
        new Cookies().remove('shopnow_type', {path:"/"});
//        this.cookies.remove('shopnow_jwt_token');
//        this.cookies.remove('shopnow_username');
//        this.cookies.remove('shopnow_id');
//        this.cookies.remove('shopnow_status');
//        this.cookies.remove('shopnow_type');
        this.toggleLoggedIn();
        
    }

    
    addToCart = (evt, product_id, history) =>{
        evt.preventDefault();

        if (!this.state.isLoggedIn){
            alert("login please");
            history.push('/login');
        }
        else{
            let formData = new FormData();
            formData.append("product", product_id);
            formData.append("customer", this.cookies.get('shopnow_id'));
            formData.append("count", 1);


            fetch(this.state.addtocart_url,{
                method:'POST',
                headers: new Headers({
                     'Authorization': `JWT ${this.cookies.get("shopnow_jwt_token")}`,
                   }),
                body : formData,
            })
            .then(response => {
                if (response.ok) {
                        return response.json();
                      } else {
                        evt.preventDefault();
                        var error = new Error(response.statusText);
                        error.response = response;
                        alert(error,response.statusText);
                        throw error
                      }
            })
            .then(responseJson => {
                history.push('/cart');
            })
            .catch(e => {alert(e);});
        }

        
    }
    


    
    editProduct = (evt, product_id, owner_id) =>{
        
        if(owner_id != this.cookies.get('shopnow_id')){
            window.alert("no access");
            evt.preventDefault();
        }
        
        
    }
    
    deleteProduct = (evt, product_id, owner_id, history) =>{
        if(owner_id != this.cookies.get('shopnow_id')){
            window.alert("no access");
            evt.preventDefault();
        }
        else if(window.confirm("Do you want to delete the item.") == true){
            fetch(this.state.deleteproduct_url + product_id + '/',{
                method:'DELETE',
                headers: new Headers({
                     'Authorization': `JWT ${this.cookies.get("shopnow_jwt_token")}`,
                     'Content-Type': 'application/json',
                   }),
            })
            .then(response => {
                if (response.ok) {
                    alert("product deleted");
                    history.push('/');
                  } else {
                    evt.preventDefault();
                    var error = new Error(response.statusText);
                    error.response = response;
                    alert(error,response.statusText);
                    throw error
                  }
            })
            .catch(e => {alert(e);});
        }
        else{
            evt.preventDefault();
        }
        
        
    }

    
    changeOrderStatus = (evt, order_id, status, deliveryDate) => {
        
        let formData = new FormData();
        
        formData.append("status" , status);
        if(status == 2){
            if(deliveryDate == ""){
                alert("enter delivery date");
                return;
            }
            
            formData.append("date_delivered" , deliveryDate);
        }
        fetch(this.state.deleteorder_url + order_id + '/',{
                method:'PATCH',
                headers: new Headers({
                     'Authorization': `JWT ${this.cookies.get("shopnow_jwt_token")}`,
                     'Accept': 'application/json',
                   }),
                body : formData,
            })
            .then(response => {
                
                if (response.ok) {
                    alert(`Order ${order_id}  - status Updated`);
                }
                else{

                    var error = new Error(response.statusText);
                    error.response = response;
                    alert(error,response.statusText);
                    throw error
                  }
            })
            .catch(e => {alert(e);});
    }
    
    

  render() {
    return (
      <div>

            
            <React.Fragment>
                <Router>
                    
                    <div>

                        <Route render ={props =>
                                <HeaderComponent 
                                    title = "ShopNow" 
                                    isLoggedIn = {this.state.isLoggedIn} 
                                    toggleLoggedIn = {this.toggleLoggedIn}
                                    logout = {this.logout}
                                    reload = {this.reload}
                                    {...props}
                                />
                            }
                        />

        
        
                        <Route exact path="/login" 
                            render={props => 
                                !this.state.isLoggedIn
                                ?
                                <Login 
                                    login = {this.login}
                                    userDetails_url = {this.state.userDetails_url}
                                    login_url = {this.state.login_url}
                                    toggleLoggedIn = {this.toggleLoggedIn}
                                    {...props}
                                />
                                :
                                <Redirect to={"/"}/>
                            }
                         />
        
        
                         <Route exact path="/merchant/signup" 
                            render={props => !this.state.isLoggedIn
                                ?
                                <SignUp 
                                    login_url = {this.state.login_url} 
                                    signup_url = {this.state.merchant_signup_url} 
                                    login = {this.login} 
                                    isMerchant = {true}
                                    {...props}
                                />
                                :
                                <Redirect to="/"/>
                            }
                         />
                      
        
                         <Route exact path="/customer/signup" 
                            render={props => !this.state.isLoggedIn
                                ?
                                <SignUp 
                                    login_url = {this.state.login_url} 
                                    signup_url = {this.state.customer_signup_url} 
                                    login = {this.login} 
                                    isMerchant = {false}
                                    {...props}
                                />
                                :
                                <Redirect to="/"/>
                            }
                         />
        

                         <Route exact path="/addproduct" 
                            render={props => this.state.isLoggedIn
                                ?
                                <AddProduct 
                                    addproduct_url = {this.state.addproduct_url} 
                                    {...props}
                                />
                                :
                                <Redirect to="/login" />
                            }
                         />


                         <Route exact path="/" 
                            render={props => 
                                <Products 
                                    products_url = {this.state.products_url} 
                                    addToCart = {this.addToCart} 
                                    deleteProduct = {this.deleteProduct} 
                                    editProduct = {this.editProduct} 
                                    search = ""
                                    {...props}
                                 />
                            }
                          />

                         <Route exact path="/product/:id" 
                            render={props => 
                                <ProductDetails 
                                    product_details_url = {this.state.product_details_url} 
                                    addToCart = {this.addToCart} 
                                    deleteProduct = {this.deleteProduct} 
                                    editProduct = {this.editProduct} 
                                    {...props}
                                />
                            }
                        />


                        <Route exact path="/myproducts/:id" 
                            render={props => this.state.isLoggedIn
                                ? 
                                <MyProducts 
                                    myproducts_url = {this.state.myproducts_url} 
                                    addToCart = {this.addToCart} 
                                    deleteProduct = {this.deleteProduct} 
                                    editProduct = {this.editProduct} 
                                    {...props}
                                />
                                :
                                <Redirect to="/login" />
                            }
                        />
        
        
                             
                         <Route exact path="/editproduct/:id" 
                            render={props => this.state.isLoggedIn
                                ?
                                <EditProduct 
                                    product_details_url = {this.state.product_details_url} 
                                    editproduct_url = {this.state.editproduct_url} 
                                    {...props}
                                />
                                :
                                <Redirect to="/login" />
                            }
                         />


                        <Route exact path="/cart" 
                            render={props => this.state.isLoggedIn
                                ?
                                <Cart 
                                    cart_url = {this.state.cart_url} 
                                    deletecart_url = {this.state.deletecart_url}
                                    editcart_url = {this.state.editcart_url}
                                    {...props}
                                />
                                :
                                <Redirect to="/login" />
                            }
                         />


                        <Route exact path="/product/:id/placeorder" 
                            render={props => this.state.isLoggedIn
                                ?
                                <PlaceOrder 
                                    productdata_url = {this.state.productdata_url} 
                                    placeorder_url = {this.state.placeorder_url} 
                                    {...props}
                                />
                                :
                                <Redirect to="/login" />
                            }
                        />

                        
                        <Route exact path="/:id/placeorder/:cart" 
                            render={props => this.state.isLoggedIn
                                ?
                                <PlaceOrder 
                                    productdata_url = {this.state.productdata_url} 
                                    placeorder_url = {this.state.placeorder_url} 
                                    {...props}
                                />
                                :
                                <Redirect to="/login" />
                            }
                        />


                        <Route exact path="/orders" 
                            render={props => this.state.isLoggedIn
                                ?
                                <Orders 
                                    orders_url = {this.state.orders_url}
                                    changeOrderStatus = {this.changeOrderStatus}
                                    {...props}
                                />
                                :
                                <Redirect to="/login" />
                            }
                         />

                        <Route exact path="/myorders/:id" 
                            render={props => this.state.isLoggedIn
                                ?
                                <MerchantOrders 
                                    merchantorders_url = {this.state.merchantorders_url}
                                    changeOrderStatus = {this.changeOrderStatus}
                                    {...props}
                                />
                                :
                                <Redirect to="/login" />
                            }
                         />


                        <Route exact path="/profile" 
                            render={props => this.state.isLoggedIn
                                ?
                                <Profile 
                                    profile_url = {(this.cookies.get('shopnow_type') == 1)?this.state.customerprofile_url:this.state.merchantprofile_url}
                                    editprofile_url = {(this.cookies.get('shopnow_type') == 1)?this.state.editcustomer_url:this.state.editmerchant_url}
                                    {...props}
                                />
                                :
                                <Redirect to="/login" />
                            }
                         />

                         <Route exact path="/about" 
                            render={props=>
                                <About 
                                    {...props}
                                />
                            }
                         />
                             
                    </div>
                </Router>
                <br/><br/>
                
            </React.Fragment>
            <footer class="btn-primary  disabled" align = "center">

                    <div class="footer-copyright text-center py-3">© 2018 Copyright : Pranadeep</div>
                    
                    <a href="https://github.com/pranadeepreddy" target="_blank"><ion-icon name="logo-github" Style = "font-size: 30px;"></ion-icon></a>&nbsp;&nbsp;
                    <a href="https://www.facebook.com/gpranadeep.reddy" target="_blank"><ion-icon name="logo-facebook" Style = "font-size: 30px;"></ion-icon></a>&nbsp;&nbsp;
                    <a href="https://www.linkedin.com/in/pranadeep-reddy-659b37136/" target="_blank"><ion-icon name="logo-linkedin" Style = "font-size: 30px;"></ion-icon></a>&nbsp;&nbsp;
                    <a href="https://twitter.com/Pranadeep17" target="_blank"><ion-icon name="logo-twitter" Style = "font-size: 30px;"></ion-icon></a>&nbsp;&nbsp;
                    <a href="https://www.instagram.com/pranadeepr/?hl=en" target="_blank"><ion-icon name="logo-instagram" Style = "font-size: 30px;"></ion-icon></a>&nbsp;&nbsp;
                </footer>
      </div>
    );
  }
}

export default App;
