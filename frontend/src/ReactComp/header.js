import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import Cookies from 'universal-cookie';



class HeaderComponent extends Component{
    

    cookies = new Cookies();
    
//    constructor(props){
//        super(props);
//        let token = this.cookies.get('shopnow_jwt_token');
//        if (!(typeof token === 'undefined'))
//        {
//            this.props.toggleLoggedIn();
//
//        }
//    }


    search = () =>{
        if(document.getElementById('search').value != ""){
            this.props.history.push("/?search=" + document.getElementById('search').value);
            //this.props.reload.bind();
        }
    }

    render(){
        const {title} = this.props
        const {isLoggedIn} = this.props
        return (

            <React.Fragment>
                <div>
                    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">    
                      <Link class="navbar-brand" to="/">{title}</Link>
                      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                      </button>

                      <div class="collapse navbar-collapse" id="navbarColor01">
                        <ul class="navbar-nav mr-auto">
                          <li class="nav-item">
                            <Link class="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
                          </li>
                          <li class="nav-item">
                              <Link class="nav-link" to="/profile">Profile</Link> 
                          </li>
                          
                          <li class="nav-item">
                              {
                                    (this.cookies.get('shopnow_type') == 2) ?
                                    <Link class="nav-link" to={"/myproducts/" + this.cookies.get('shopnow_id')}>My Products</Link>
                                    :
                                    <Link class="nav-link" to="/cart">Cart</Link>
                                }
                            
                          </li>
                          <li class="nav-item">
                            {
                                    (this.cookies.get('shopnow_type') == 2) ?
                                    <Link class="nav-link" to={"/myorders/" + this.cookies.get('shopnow_id')}>My orders</Link>
                                    :
                                    <Link class="nav-link" to="/orders">Orders</Link>
                            }
                          </li>
                          <li class="nav-item" activeClass ="nav-item active">
                            {
                                    (this.cookies.get('shopnow_type') == 2) &&
                                    <Link class="nav-link" to="/addproduct" >Add Products</Link>
                                    
                            }
                          </li>
                        </ul>
                        <input class="form-inline my-2 my-lg-0" type="text" id="search" placeholder="Search"/>
                        &nbsp;  
                        <button class="btn btn-secondary my-2 my-sm-0" onClick={() => this.search()}>Search</button>
                        <div>
                              <ul class="navbar-nav mr-auto">
                              <li class="nav-item active">
                                   {
                                        isLoggedIn ? <Link class="nav-link" to="/login" onClick = {this.props.logout}>Logout</Link>
                                        :
                                        <Link class="nav-link" to="/login">Login</Link>
                                    }
                              </li>
                            </ul>
                        </div>

                      </div>
                    </nav>
                
                </div>


            </React.Fragment>
        )

    }
}

export default HeaderComponent;