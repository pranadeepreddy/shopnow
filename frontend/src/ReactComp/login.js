import React,{Component} from 'react'
import Cookies from 'universal-cookie';

class Login extends Component{

    state = {
        
        tokenValidity : 1 * 24 * 60 * 60 *1000,
    };

    cookies = new Cookies();

//    componentWillMount(){
//        let token = this.cookies.get('shopnow_jwt_token');
//        console.log(this.props.isLoggedIn,token)
//        if (!(typeof token === 'undefined'))
//        {
//            this.props.login(token, this.props.history);
//
//        }
//     }

    
    
    
    submit = (e) =>{
        e.preventDefault();

        var form = new FormData(document.getElementById("login_password").value);
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
                    
                    var error = new Error(response.statusText);
                    error.response = response;
                    alert(error,response.statusText);
                    throw error
                  }
            })
        .then(responseJson => {
            this.props.login(responseJson.token);

        })
        .catch(e => {console.log (e);});
        }

        render(){

            return(
                
                <div Style="width:300px;margin:auto;">
                    <br/><br/>
                    <legend  align = "center">Login</legend>
                    <br/>
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
                
                

                )

        }

}
export default Login;