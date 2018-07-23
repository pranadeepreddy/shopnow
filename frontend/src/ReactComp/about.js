import React,{Component} from 'react'
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";

class About extends Component{

    state = {
        
        
    };

    render(){

        return(
            
            <div>
                <br/><br/>
                <div class="card mb-3" Style="width:60%;margin:auto;">
                
                    <div class="card-header" Style="width:100%;" align = "center"><h4><b>About</b></h4></div>
                    <div><br/></div>
                    <br/>
                    <div Style = "width : 80%;margin : auto">
                        <p>
                        ShopNow is similar to Flipkart app in which customer can see a wide range of 
                        products and add them to cart and place the order after logged in. Merchants 
                        can add the products to the site for sale. Admin can manage these merchant accounts.
                        </p>
                        <p>
                            This is developed using the following technologies:
                        </p>
                        <ul align="left">
                        <li>django-rest-framework</li> 
                        <li>ReactJs</li>
                        </ul>
                        <p Style = "margin : auto;width : 60%">
                        Feel free to view my github repository<a class = "btn btn-link" href = "https://github.com/pranadeepreddy/shopnow" target="_blank">ShopNow</a>
                        </p>
                        <p Style = "float : right">
                        By : Pranadeep
                        </p>
                        
                    </div>
                    <br/><br/>

                </div>
            </div>
            
            

            )

    }

}
export default About;