import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import NavLink from "./nav_link";


class HeaderComponent extends Component{
    
    
    cookies = new Cookies();
    


    searching = (event) =>{
        if (event.keyCode === 13) {
            this.search();
        }
    }
    search = () =>{
        if(document.getElementById('search').value != ""){
            this.props.history.push("/?search=" + document.getElementById('search').value);
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
                            <NavLink  class="nav-link" to="/"><ion-icon name="home"></ion-icon>Home</NavLink >
                          </li>
                          <li class="nav-item">
                              <NavLink class="nav-link" to="/profile"><ion-icon name="person"></ion-icon>Profile</NavLink> 
                          </li>
                          
                          <li class="nav-item">
                              {
                                    (this.cookies.get('shopnow_type') == 2) ?
                                    <NavLink class="nav-link" to={"/myproducts/" + this.cookies.get('shopnow_id')}><ion-icon name="clipboard"></ion-icon>My Products</NavLink>
                                    :
                                    <NavLink class="nav-link" to="/cart"><ion-icon name="cart"></ion-icon>Cart</NavLink>
                                }
                            
                          </li>
                          <li class="nav-item">
                            {
                                    (this.cookies.get('shopnow_type') == 2) ?
                                    <NavLink class="nav-link" to={"/myorders/" + this.cookies.get('shopnow_id')}><ion-icon name="basket"></ion-icon>My orders</NavLink>
                                    :
                                    <NavLink class="nav-link" to="/orders"><ion-icon name="basket"></ion-icon>Orders</NavLink>
                            }
                          </li>
                          <li class="nav-item" activeClass ="nav-item active">
                            {
                                    (this.cookies.get('shopnow_type') == 2) &&
                                    <NavLink class="nav-link" to="/addproduct" ><ion-icon name="add-circle"></ion-icon>Add Products</NavLink>
                                    
                            }
                          </li>
                        </ul>
                        
                        <div>
                              <ul class="navbar-nav mr-auto">
                              <li class="nav-item active">
                                   {
                                        isLoggedIn ? <Link class="nav-link" to="/login" onClick = {this.props.logout}>Logout</Link>
                                        :
                                        <Link class="nav-link" to="/login">SignUp / Login</Link>
                                    }
                              </li>
                            </ul>
                        </div>

                      </div>
                    </nav>
                    <div class = "navbar-nav dark bg-primary">
                       <div class = "form-inline my-2 my-lg-0" Style = "margin : auto">
                            <input class="form-inline my-2 my-lg-0"  type="text" id="search" onKeyDown = {this.searching} placeholder="Search"/>
                            <button class="btn btn-secondary my-2 my-sm-0" id = "search_button" onClick={() => this.search()}>Search</button>
                       </div>
                    
                    </div>
                
                </div>


            </React.Fragment>
        )

    }
}

export default HeaderComponent;