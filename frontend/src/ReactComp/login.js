import React,{Component} from 'react'
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";

class Login extends Component{

    state = {
        
        
    };

    cookies = new Cookies();    
    
    
    submit = (e) =>{
        e.preventDefault();
        var form = new FormData();
        form.append('username', document.getElementById("login_username").value);
        form.append('password', document.getElementById("login_password").value);

        fetch(this.props.login_url,{
            method:'POST',
            body: form
            })
            .then(response => {
                
                if (response.ok) {
                    return response.json();
                  } else {
                    console.log(response, response.json());
                    var error = new Error(response.statusText);
                    error.response = response;
                    throw error
                  }
            })
        .then(responseJson => {
            this.props.login(responseJson.token);

        })
        .catch(e => {alert(e);});
        }

        render(){

            return(
                
                <div>
                    <br/><br/>
                    <div class="card mb-3" Style="width:500px;margin:auto;">
                    
                        <div class="card-header" align = "center"><h4><b>Login</b></h4></div>
                        <div><br/></div>
                        <br/>
                        <div Style="width:300px;margin:auto;">
                            <form onSubmit={this.submit}>
                                <label>Username</label>
                                <input id = "login_username" type="text" class="form-control" placeholder="Enter Username" required/>
                                <br></br>
                                <label>Password</label>
                                <input id = "login_password" type="password" class="form-control" placeholder="Enter Password" required/>
                                <br></br>
                                <div align = "center">
                                    <button type="submit" class="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                        <br/>
                        <div>
                            <Link class="btn btn-link" to="/merchant/signup" Style="float:left">SignUp as Merchant</Link>
                            <Link class="btn btn-link" to="/customer/signup" Style="float:right">SignUp as Customer</Link>
                        </div>
                        <br/><br/>

                    </div>
                </div>
                
                

                )

        }

}
export default Login;