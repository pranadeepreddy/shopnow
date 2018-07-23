import React,{Component} from 'react'
import { Link } from "react-router-dom";


class SignUp extends Component{

    state = {
        
    
    };
    
    
    
    submit = (e) =>{
        e.preventDefault();
        
        let username = document.getElementById("signup_username").value;
        let password = document.getElementById("signup_password").value;
        
        let body ;
        
        if(this.props.isMerchant){
            body = {
                user: {
                    username: username,
                    first_name: document.getElementById("signup_firstname").value,
                    last_name: document.getElementById("signup_lastname").value,
                    email: document.getElementById("signup_email").value,
                    password: password
                }, 
                house_no: document.getElementById("signup_houseno").value,
                street: document.getElementById("signup_street").value,
                city: document.getElementById("signup_city").value,
                state: document.getElementById("signup_state").value,
                pin: document.getElementById("signup_pin").value,
                landmark: document.getElementById("signup_landmark").value,

                company_name: document.getElementById("signup_companyname").value,
                company_email: document.getElementById("signup_companyemail").value,
                aadhar_no: document.getElementById("signup_aadharno").value
            }
        }
        else{
            body = {
                user: {
                    username: username,
                    first_name: document.getElementById("signup_firstname").value,
                    last_name: document.getElementById("signup_lastname").value,
                    email: document.getElementById("signup_email").value,
                    password: password
                }, 
                house_no: document.getElementById("signup_houseno").value,
                street: document.getElementById("signup_street").value,
                city: document.getElementById("signup_city").value,
                state: document.getElementById("signup_state").value,
                pin: document.getElementById("signup_pin").value,
                landmark: document.getElementById("signup_landmark").value,

            }
        }
        
        fetch(this.props.signup_url,{
            method:'POST',
            headers: new Headers({
                 'Content-Type': 'application/json',
                 'Accept': 'application/json',
               }),
            body: JSON.stringify(body),
            })
            .then(response => {
                console.log(response, response.json());
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
            
            var loginform = new FormData();
            loginform.append('username', username);
            loginform.append('password', password);
            fetch(this.props.login_url,{
                method:'POST',
                headers: new Headers({
                 'Accept': 'application/json',
               }),
                body: loginform,
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
                this.props.login(responseJson.token);
            })
        })
        .catch(e => {alert(e);});
        }

        render(){

            return(
                
                <div class="container">
                    <br/>
                    <div class="w3-container" align='center'>
                          <div class="w3-card-4" Style="width:70%">
                              <div class="card-header" align = "center">
                                  <h4><b>
                                    {
                                        this.props.isMerchant
                                        ?
                                            <legend align='center'>Merchant SignUp</legend>
                                        :
                                            <legend align='center'>Customer SignUp</legend>
                                    }
                                  </b></h4>
                              </div>                                
                                <div class="w3-container" align="left">
                                    <div class="row">
                                        
                                        <div class="col-sm-12">
                                            <br/>
                                            <form onSubmit={this.submit}>
                                                <table class="table table-hover">
                                                  <tbody>
                                                    <tr>
                                                      <th scope="row">Username</th>
                                                      <td>
                                                      <input id = "signup_username" class="form-control" type = "text" name = "username" placeholder = "username" required/>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <th scope="row">Password</th>
                                                      <td>
                                                      <input id = "signup_password" class="form-control" type = "password" name = "password" placeholder = "********" required/>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <th scope="row">First Name</th>
                                                      <td>
                                                        <input id = "signup_firstname" class="form-control" type = "text" name = "firstname" placeholder = "firstname" required/>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <th scope="row">Last Name</th>
                                                      <td>
                                                        <input id = "signup_lastname" class="form-control" type = "text" name = "lastname" placeholder = "lastname" required/>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <th scope="row">Email</th>
                                                      <td>
                                                        <input id = "signup_email" class="form-control" type = "email" name = "email" placeholder = "email" required/>
                                                      </td>
                                                    </tr>
                                                    {
                                                        this.props.isMerchant &&
                                                        <tr>
                                                          <th scope="row">Company Name</th>
                                                          <td>
                                                            <input id = "signup_companyname" class="form-control" type = "text" name = "companyname" placeholder = "companyname" required/>
                                                          </td>
                                                        </tr>
                                                    }
                                                    {
                                                        this.props.isMerchant &&
                                                        <tr>
                                                          <th scope="row">Company Email</th>
                                                          <td>
                                                            <input id = "signup_companyemail" class="form-control" type = "email" name = "companyemail" placeholder = "companyemail" required/>
                                                          </td>
                                                        </tr>
                                                        }
                                                    {
                                                        this.props.isMerchant &&
                                                        <tr>
                                                          <th scope="row">Aadhar No</th>
                                                          <td>
                                                            <input id = "signup_aadharno" class="form-control" type = "text" name = "aadharno" placeholder = "aadharno" required/>
                                                          </td>
                                                        </tr>
                                                    }
                                                    <tr>
                                                      <th scope="row">House No</th>
                                                      <td>
                                                            <input id = "signup_houseno" class="form-control" type = "text" name = "houseno" placeholder = "houseno" required/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                      <th scope="row">Street</th>
                                                      <td>
                                                            <input id = "signup_street" class="form-control" type = "text" name = "street" placeholder = "street" required/>
                                                      </td>
                                                    </tr>        
                                                    <tr>
                                                      <th scope="row">City</th>
                                                      <td>
                                                            <input id = "signup_city" class="form-control" type = "text" name = "city" placeholder = "city" required/>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <th scope="row">State</th>
                                                      <td>
                                                            <input id = "signup_state" class="form-control" type = "text" name = "state" placeholder = "state" required/>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <th scope="row">Pin</th>
                                                      <td>
                                                            <input id = "signup_pin" class="form-control" type = "text" name = "pin" placeholder = "pin" required/>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <th scope="row">Landmark</th>
                                                       <td>
                                                            <input id = "signup_landmark" class="form-control" type = "text" name = "landmark" placeholder = "landmark" required/>
                                                        </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                <div align = "center">
                                                    <button type="submit" class="btn btn-primary">SignUp</button>
                                                </div>
                                             </form>
                                            {
                                                !this.props.isMerchant
                                                ?
                                                    <Link class="btn btn-link" to="/merchant/signup" Style="float:right">SignUp as Merchant</Link>
                                                :
                                                    <Link class="btn btn-link" to="/customer/signup" Style="float:right">SignUp as Customer</Link>
                                            }
                                            <br/><br/>
                                        </div> 
                                    </div>
                                    <br/>
                                </div>
                          </div>
                        <br/>
                    </div>
                    
                </div>
                )

        }

}


export default SignUp;