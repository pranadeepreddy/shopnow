import React,{Component} from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class MerchantOrders extends Component{
    
    
    state = {
        acceptOrder : 2,
        cancelOrder : 3,
        orders_results : [],
    }
    

    componentWillMount(){
        fetch(this.props.merchantorders_url + this.props.match.params.id + '/',{
            method:'GET',
            headers: new Headers({
                 'Authorization': `JWT ${this.props.token}`,
               }),
            })
        .then(response => {
            if (response.ok) {
                    return response.json();
                  } else {
                    
                    var error = new Error(response.statusText);
                    error.response = response;
                      console.log(response.statusText);
                    alert(error,response.statusText);
                    throw error
                  }
        })
        .then(responseJson => {
            this.setState({ orders_results : responseJson});

        })
        .catch(e => {console.log (e);});
    }


    

    render(){
        const options = {year: 'numeric', month: 'long', day: 'numeric' };
        return(
            <div class="container">
              <legend align='center'>  My Orders</legend>
              <div><br/></div>
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
                                            <button type="button" class="btn btn-primary" data-toggle="collapse" data-target={"#demo"+item.id}  align = "center">Show Address</button>
                                            
                                        </div> 
                                        <div class="col-sm-4">
                                            <p>Order Id  :  {item.id}</p>
                                            <p>ordered date : {new Date(item.date_ordered).toLocaleDateString("en-US", options)}</p>
                                            {
                                                item.date_delivered == null || item.status == 1 || item.status == 3 || item.status == 4
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
                                                Status  :  {item.status ==1 && "pending"}
                                                            {item.status ==2 && "shipping"}
                                                            {item.status ==3 && "rejected"}
                                                            {item.status ==4 && "cancelled"}
                                                            {item.status ==5 && "delivered"}
                                            </p>
                                            {
                                                item.status ==1 &&
                                                    <div class="row">
                                                        <div class="col-sm-3">
                                                            <button class = "btn btn-primary" onClick={(evt) => this.props.changeOrderStatus(evt, item.id, this.state.acceptOrder)} >Accept Order</button>
                                                        </div>
                                                        <div class="col-sm-3">
                                                    
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <button class = "btn btn-primary" onClick={(evt) => this.props.changeOrderStatus(evt, item.id, this.state.cancelOrder)} >Reject Order</button>
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
        )
    }


}

export default MerchantOrders;