import React,{Component} from 'react'

class SignUp extends Component{

    state = {
        
    
    };
    
    
    
    submit = (e) =>{
        e.preventDefault();
        
        let username = document.getElementById("signup_username").value;
        let password = document.getElementById("signup_password").value;
        
        let body = {
                "user": {
                    "username": username,
                    "first_name": document.getElementById("signup_firstname").value,
                    "last_name": document.getElementById("signup_lastname").value,
                    "email": document.getElementById("signup_email").value,
                    "password": password
                }, 
                "house_no": document.getElementById("signup_houseno").value,
                "street": document.getElementById("signup_street").value,
                "city": document.getElementById("signup_city").value,
                "state": document.getElementById("signup_state").value,
                "pin": document.getElementById("signup_pin").value,
                "landmark": document.getElementById("signup_landmark").value
            }
        
        if(this.props.isMerchant){
            body = body + {"company_name": document.getElementById("signup_companyname").value,
                "company_email": document.getElementById("signup_companyemail").value,
                "aadhar_no": document.getElementById("signup_aadharno").value
            }
        }
        
        
        fetch(this.props.signup_url,{
            method:'POST',
            headers: new Headers({
                 'Content-Type': 'application/json',
               }),
            body: JSON.stringify(body),
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
            
            var loginform = new FormData();
            loginform.append('username', username);
            loginform.append('password', password);
            fetch(this.props.login_url,{
                method:'POST',
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
                
                
                <div Style="width:300px;margin:auto;">
                    <br/><br/>
                    {
                        this.props.isMerchant
                        ?
                            <legend align='center'>Merchant SignUp</legend>
                        :
                            <legend align='center'>Customer SignUp</legend>
                    }
                    <br/>
                    <form onSubmit={this.submit}>
                        <input id = "signup_username" class="form-control" type = "text" name = "username" placeholder = "username" required/>
                        <br/>
                        <input id = "signup_password" class="form-control" type = "password" name = "password" placeholder = "********" required/>
                        <br/>
                        <input id = "signup_firstname" class="form-control" type = "text" name = "firstname" placeholder = "firstname" required/>
                        <br/>
                        <input id = "signup_lastname" class="form-control" type = "text" name = "lastname" placeholder = "lastname" required/>
                        <br/>
                        <input id = "signup_email" class="form-control" type = "email" name = "email" placeholder = "email" required/>
                        <br/>
                        {
                            this.props.isMerchant &&
                            <input id = "signup_companyname" class="form-control" type = "text" name = "companyname" placeholder = "companyname" required/>
                        }
                        {
                            this.props.isMerchant &&
                            <br/>
                        }
                        {
                            this.props.isMerchant &&
                            <input id = "signup_companyemail" class="form-control" type = "email" name = "companyemail" placeholder = "companyemail" required/>
                        }
                        {
                            this.props.isMerchant &&
                            <br/>
                        }
                        {
                            this.props.isMerchant &&
                            <input id = "signup_aadharno" class="form-control" type = "text" name = "aadharno" placeholder = "aadharno" required/>
                        }
                        {
                            this.props.isMerchant &&
                            <br/>
                        }
                        <input id = "signup_houseno" class="form-control" type = "text" name = "houseno" placeholder = "houseno" required/>
                        <br/>
                        <input id = "signup_street" class="form-control" type = "text" name = "street" placeholder = "street" required/>
                        <br/>
                        <input id = "signup_city" class="form-control" type = "text" name = "city" placeholder = "city" required/>
                        <br/>
                        <input id = "signup_state" class="form-control" type = "text" name = "state" placeholder = "state" required/>
                        <br/>
                        <input id = "signup_pin" class="form-control" type = "text" name = "pin" placeholder = "pin" required/>
                        <br/>
                        <input id = "signup_landmark" class="form-control" type = "text" name = "landmark" placeholder = "landmark" required/>
                        <br/>
                        <div align = "center">
                            <button type="submit" class="btn btn-primary">SignUp</button>
                        </div>
                    </form>
                    <br/><br/><br/><br/>
                </div>
                
                
                

                )

        }

}


export default SignUp;