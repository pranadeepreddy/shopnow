import React,{Component} from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import { ScaleLoader } from 'react-spinners';



class Profile extends Component{

    state = {
        username : '',
        firstname : '',
        lastname : '',
        email : '',
        companyname : '',
        companyemail : '',
        aadharno : '',
        houseno : '',
        street : '',
        city : '',
        mystate : '',
        pin : '',
        landmark : '',

        result_profile : [],
        loading: true,
    };

    cookies = new Cookies();

    toggleLoading = (loading) =>{
        this.setState({loading});
    }

    saveName=(username)=>{

        this.setState({username});

    }

    saveFirstname=(firstname)=>{

        this.setState({firstname});

    }
    
    saveLastname=(lastname)=>{

        this.setState({lastname});

    }
    
    saveEmail=(email)=>{

        this.setState({email});

    }
    
    saveCompanyname=(companyname)=>{

        this.setState({companyname});

    }
    
    saveCompanyemail=(companyemail)=>{

        this.setState({companyemail});

    }
    
    saveAadharno=(aadharno)=>{

        this.setState({aadharno});

    }
    
    saveHouseno=(houseno)=>{

        this.setState({houseno});

    }
    
    saveStreet=(street)=>{

        this.setState({street});

    }
    
    saveCity=(city)=>{

        this.setState({city});

    }
    
    savemystate=(mystate)=>{

        this.setState({mystate});

    }
    
    savePin=(pin)=>{

        this.setState({pin});

    }
    
    saveLandmark=(landmark)=>{

        this.setState({landmark});

    }

    saveResults = (result_products)=>{

        this.setState({result_products});
    }
    
    componentWillMount(){
        fetch(this.props.profile_url,{
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
            this.toggleLoading(false);
            this.setState({ result_profile : responseJson[0]});
            this.saveName(this.state.result_profile.user.username);
            this.saveFirstname(this.state.result_profile.user.first_name);
            this.saveLastname(this.state.result_profile.user.last_name);
            this.saveEmail(this.state.result_profile.user.email);
            if((this.cookies.get('shopnow_type') == 2)){
                this.saveCompanyname(this.state.result_profile.company_name);
                this.saveCompanyemail(this.state.result_profile.company_email);
                this.saveAadharno(this.state.result_profile.aadhar_no);
            }
            this.saveHouseno(this.state.result_profile.house_no);
            this.saveStreet(this.state.result_profile.street);
            this.saveCity(this.state.result_profile.city);
            this.savemystate(this.state.result_profile.state);
            this.savePin(this.state.result_profile.pin)
            this.saveLandmark(this.state.result_profile.landmark);

        })
        .catch(e => {alert(e);});
     }
    


    submit = (e) =>{
        e.preventDefault();
        fetch(this.props.editprofile_url + this.cookies.get("shopnow_id") + '/',{
            method:'PATCH',
            headers: new Headers({
                 'Authorization': `JWT ${this.cookies.get("shopnow_jwt_token")}`,
                 'Content-Type': 'application/json',
               }),
            body: JSON.stringify({
                "user": {
                    "first_name": this.state.firstname,
                    "last_name": this.state.lastname,
                    "email": this.state.email,
                    "password": this.state.password
                },
                "company_name": this.state.companyname,
                "company_email": this.state.companyemail,
                "aadhar_no": this.state.aadharno,
                "house_no": this.state.houseno,
                "street": this.state.street,
                "city": this.state.city,
                "state": this.state.mystate,
                "pin": this.state.pin,
                "landmark": this.state.landmark
            }),
            })
            .then(response => {
                if (response.ok) {
                    
                    alert("profile updated");
                  } else {
                    
                    var error = new Error(response.statusText);
                    error.response = response;
                    alert(error,response.statusText);
                    throw error
                  }    
            })
        .catch(e => {alert(e);});
        }
    
    render(){

        return(
                <div class="container">
                    <br/>
                    <div class="w3-container" align='center'>
                          <div class="w3-card-4" Style="width:100%">
                              <div class="card-header" align = "center">
                                  <h4><b>
                                    {
                                        (this.cookies.get('shopnow_type') == 2)
                                        ?
                                            <legend align='center'>Merchant Profile</legend>
                                        :
                                            <legend align='center'>Customer Profile</legend>
                                    }
                                  </b></h4>
                              </div>
                              <div><br/></div>
                              {
                                this.state.loading ?
                                    <div className='sweet-loading' align="center">
                                        <ScaleLoader
                                          color={'#123abc'} 
                                          loading={this.state.loading} 
                                        />
                                      </div>
                                :
                            <div>
                                
                                <div class="w3-container" align="left">
                                    <div class="row">
                                        
                                        <div class="col-sm-12" >
                                            <br/>
                                            <form onSubmit={this.submit}>
                                                <table class="table table-hover">
                                                  <tbody>
                                                    <tr>
                                                      <th scope="row">Username</th>
                                                      <td>{this.state.username}</td>
                                                    </tr>
                                                    <tr>
                                                      <th scope="row">First Name</th>
                                                      <td>
                                                        <input onChange = {(e)=>this.saveFirstname(e.target.value)} class="form-control" type = "text" name = "firstname" value = {this.state.firstname} />
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <th scope="row">Last Name</th>
                                                      <td>
                                                        <input onChange = {(e)=>this.saveLastname(e.target.value)} class="form-control" type = "text" name = "lastname" value = {this.state.lastname} />
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <th scope="row">Email</th>
                                                      <td>
                                                        <input onChange = {(e)=>this.saveEmail(e.target.value)} class="form-control" type = "email" name = "email" value = {this.state.email} />
                                                      </td>
                                                    </tr>
                                                    {
                                                        (this.cookies.get('shopnow_type') == 2) &&
                                                        <tr>
                                                          <th scope="row">Company Name</th>
                                                          <td>
                                                            <input onChange = {(e)=>this.saveCompanyname(e.target.value)} class="form-control" type = "text" name = "companyname" value = {this.state.companyname} />
                                                          </td>
                                                        </tr>
                                                    }
                                                    {
                                                        (this.cookies.get('shopnow_type') == 2) &&
                                                        <tr>
                                                          <th scope="row">Company Email</th>
                                                          <td>
                                                            <input onChange = {(e)=>this.saveCompanyemail(e.target.value)} class="form-control" type = "email" name = "companyemail" value = {this.state.companyemail} />
                                                          </td>
                                                        </tr>
                                                        }
                                                    {
                                                        (this.cookies.get('shopnow_type') == 2) &&
                                                        <tr>
                                                          <th scope="row">Aadhar No</th>
                                                          <td>
                                                            <input onChange = {(e)=>this.saveAadharno(e.target.value)} class="form-control" type = "text" name = "aadharno" value = {this.state.aadharno} />
                                                          </td>
                                                        </tr>
                                                    }
                                                    <tr>
                                                      <th scope="row">House No</th>
                                                      <td>
                                                            <input onChange = {(e)=>this.saveHouseno(e.target.value)} class="form-control" type = "text" name = "houseno" value = {this.state.houseno} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                      <th scope="row">Street</th>
                                                      <td>
                                                            <input onChange = {(e)=>this.saveStreet(e.target.value)} class="form-control" type = "text" name = "street" value = {this.state.street} />
                                                      </td>
                                                    </tr>        
                                                    <tr>
                                                      <th scope="row">City</th>
                                                      <td>
                                                            <input onChange = {(e)=>this.saveCity(e.target.value)} class="form-control" type = "text" name = "city" value = {this.state.city} />
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <th scope="row">State</th>
                                                      <td>
                                                            <input onChange = {(e)=>this.savemystate(e.target.value)} class="form-control" type = "text" name = "state" value = {this.state.mystate} />
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <th scope="row">Pin</th>
                                                      <td>
                                                            <input onChange = {(e)=>this.savePin(e.target.value)} class="form-control" type = "text" name = "pin" value = {this.state.pin} />
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <th scope="row">Landmark</th>
                                                       <td>
                                                            <input onChange = {(e)=>this.saveLandmark(e.target.value)} class="form-control" type = "text" name = "landmark" value = {this.state.landmark} />
                                                        </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                <div align = "center">
                                                    <button type="submit" class="btn btn-primary" >Save Changes</button>
                                                </div>
                                                <br/><br/><br/><br/>
                                             </form>
                                            
                                        </div> 
                                    </div>
                                    <br/>
                                </div>
                            </div>
                              }
                          </div>
                        <br/>
                    </div>
                </div>
            
            )

    }

}


export default Profile;