import React,{Component} from 'react'
import { BrowserRouter as Router, Route, button } from "react-router-dom";
import Cookies from 'universal-cookie';
import { ScaleLoader } from 'react-spinners';


class MerchantOrders extends Component{
    
    
    state = {
        acceptOrder : 2,
        cancelOrder : 3,
        orders_results : [],
        loading : true,
        reload : false,
        status : 1,
    }
    
    cookies = new Cookies();

    toggleLoading = (loading) =>{
        this.setState({loading});
    } 

    componentWillMount(){
        this.getData(1);
    }

    changeOrderStatus = async (evt, id, status, delivery_date) =>{
        this.setState({status});
        await this.props.changeOrderStatus(evt, id, status, delivery_date);
        this.setState(prev => ({reload : !prev.reload}));
    }

    componentDidUpdate(prevState){
        if(prevState.reload != prevState.reload)
        {
            this.update();
            this.getData(this.state.status);
        }
    }

    getData = (status) =>{
        this.toggleLoading(true);
        fetch(this.props.merchantorders_url + this.props.match.params.id + '/' + status + "/",{
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
            this.setState({ orders_results : responseJson});

        })
        .catch(e => {alert(e);});
    }

    render(){
        const options = {year: 'numeric', month: 'long', day: 'numeric' };
        return(
            <div class="container">
            <div><br/></div>
              <div class="card-header" Style = "width:90%;margin:auto;" align = "center"><h5><b>My Orders</b></h5></div>
              <div><br/></div>
                <ul class="nav nav-tabs" Style = "width:50%;margin:auto;">
                  <li class="nav-item">
                    <button class="btn btn-outline-primary active" data-toggle="tab" onClick={() => this.getData(1)}>New Orders</button>
                  </li>
                  <li class="nav-item">
                    <button class="btn btn-outline-primary" data-toggle="tab" onClick={() => this.getData(2)}>Shipping</button>
                  </li>
                  <li class="nav-item">
                      <button class="btn btn-outline-primary" data-toggle="tab" onClick={() => this.getData(5)}>Delivered</button> 
                  </li>
                  <li class="nav-item">
                      <button class="btn btn-outline-primary" data-toggle="tab" onClick={() => this.getData(3)}>Rejected</button> 
                  </li>
                  <li class="nav-item">
                      <button class="btn btn-outline-primary" data-toggle="tab" onClick={() => this.getData(4)}>Cancelled</button> 
                  </li>
                </ul>
                <br/>

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
                {this.state.orders_results.map(item => (
                    <div class="w3-container" align='center'>
                          <div class="w3-card-4" Style="width:80%">
                                <div class="w3-container" align="left">
                                    <div class="row" key={item.id}>
                                        <div class="col-sm-3">
                                            <br/>
                                            <img src={item.product.image} alt="Avatar" class="w3-round" Style="width:80%"/>
                                            <br/>
                                        </div> 
                                        <div class="col-sm-5">
                                            <p><h3>{item.product.name}</h3></p>
                                            <p>Seller  :  {item.product.merchant.company_name}</p>
                                            <p>&#x20b9;{item.product.price - ((item.product.price/100) * item.product.discount)} <small class="card-subtitle text-muted"><del>&#x20b9;{item.product.price}</del>  {item.product.discount}% off </small></p>
                                            <p>Ordered items  : {item.count}</p>
                                            <button type="button" class="btn btn-primary disabled" data-toggle="collapse" data-target={"#demo"+item.id}  align = "center">Show Address</button>
                                            
                                        </div> 
                                        <div class="col-sm-4">
                                            <p>Order Id  :  {item.id}</p>
                                            <p>ordered date : {new Date(item.date_ordered).toLocaleDateString("en-US", options)}</p>
                                            {
                                                item.status == 1 || item.status == 3 || item.status == 4
                                                ?
                                                    <p>delivery date : NA</p>
                                                :
                                                    item.status == 2 
                                                    ?
                                                        <p>expected delivery : {new Date(item.date_delivered).toLocaleDateString("en-US", options)}</p>
                                                    :
                                                        <p>delivery date : {new Date(item.date_delivered).toLocaleDateString("en-US", options)}</p>
                                            }
                                            <p>total : &#x20b9;{(item.product.price - ((item.product.price/100) * item.product.discount)) * item.count}</p>
                                            <p>
                                                Status  :  <span class="badge badge-secondary">{item.status ==1 && "pending"}</span>
                                                            <span class="badge badge-info">{item.status ==2 && "shipping"}</span>
                                                            <span class="badge badge-danger">{item.status ==3 && "rejected"}</span>
                                                            <span class="badge badge-warning">{item.status ==4 && "cancelled"}</span>
                                                            <span class="badge badge-success">{item.status ==5 && "delivered"}</span>
                                            </p>
                                            {
                                                item.status ==1 &&
                                                    <div class="row">
                                                        <div class="col-sm-12">
                                                            <h5>Expected delivery:</h5>
                                                            <input id = {item.id} type = "date"/>
                                                        </div>
                                                    </div>
                                                    
                                            }
                                            <br/>
                                            {
                                                item.status ==1 &&
                                                    <div class="row">
                                                        <div class="col-sm-3">
                                                            <button class = "btn btn-primary disabled" onClick={(evt) => this.changeOrderStatus(evt, item.id, this.state.acceptOrder, document.getElementById(item.id).value)} >Accept Order</button>
                                                        </div>
                                                        <div class="col-sm-3">
                                                    
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <button class = "btn btn-primary disabled" onClick={(evt) => this.changeOrderStatus(evt, item.id, this.state.cancelOrder)} >Reject Order</button>
                                                        </div>
                                                    </div>
                                                    
                                            }
                                            
                                        </div> 
                                    </div>
                                    
                                    <div id={"demo"+item.id} class="collapse">
                                         <header class="w3-container w3-light-grey">
                                            <h4 align='center'>Delivery Address</h4>
                                            <p>house number : {item.house_no}</p>
                                            <p>Street : {item.street}</p>
                                            <p>City : {item.city}</p>
                                            <p>State : {item.state}</p>
                                            <p>Pin : {item.pin}</p>
                                            <p>Landmark : {item.landmark}</p>
                                        </header>
                                      </div>
                                    <br/>
                                </div>
                          </div>
                        <br/>
                    </div>
                ))}
                </div>
            }
                 
              
                
                
                
                
                
            </div>
        )
    }


}

export default MerchantOrders;