import React,{Component} from 'react'
import Cookies from 'universal-cookie';

class PlaceOrder extends Component{
    
    state = {
        house_no : "",
        street : "",
        city : "",
        state : "",
        pin : "",
        landmark : "",
        count : 1,
        price : "",
        
        product_data : [],
        
    }

    cookies = new Cookies();
    
    componentWillMount(){
        if(!(this.props.match.params.cart === undefined)){
            this.saveCount(this.props.match.params.cart);
        }
            
        fetch(this.props.productdata_url + this.props.match.params.id + '/',{
            method:'GET',
            mode: "no-cors",
            headers: new Headers({
                 'Authentication': `JWT ${this.cookies.get("shopnow_jwt_token")}`,
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
            this.savePrice(responseJson[0].price);
            this.setState({ product_data : responseJson});

        })
        .catch(e => {alert(e);});
    }




    saveHouseno=(event)=>{

        const {target :{value}} = event;
        this.setState({
            house_no:value
        });

    }
    
    saveStreet=(event)=>{

        const {target :{value}} = event;
        this.setState({
            street:value
        });

    }
    
    saveCity=(event)=>{

        const {target :{value}} = event;
        this.setState({
            city:value
        });

    }
    
    savemystate=(event)=>{

        const {target :{value}} = event;
        this.setState({
            state:value
        });

    }
    
    savePin=(event)=>{

        const {target :{value}} = event;
        this.setState({
            pin:value
        });

    }
    
    saveLandmark=(event)=>{

        const {target :{value}} = event;
        this.setState({
            landmark:value
        });

    }
    
    saveCount=(count)=>{
        this.setState({count});
    }
    
    savePrice=(price)=>{
        this.setState({price});
    }

    
    incrementCart = (evt, cur_count) =>{
        this.saveCount(cur_count + 1);
    }
    
    decrementCart = (evt, cur_count) =>{
        this.saveCount(cur_count - 1);
    }


    submit = (e) =>{
        e.preventDefault();
        if(this.state.product_data[0].stock_left < this.state.count){
            alert("insufficient stock");
            return true;
        }
        
        let formData = new FormData();
        
        formData.append("house_no" ,this.state.house_no);
        formData.append("street", this.state.street);
        formData.append("city", this.state.city);
        formData.append("state", this.state.state);
        formData.append("pin", this.state.pin);
        formData.append("landmark", this.state.landmark);
        
        formData.append("product", this.props.match.params.id);
        formData.append("customer", this.cookies.get('shopnow_id'));
        
        formData.append("count", this.state.count);
        formData.append("cost", this.state.count * this.state.price);
                
        
        fetch(this.props.placeorder_url,{
            method:'POST',
            mode: "no-cors",
            headers: new Headers({
                 'Authorization': `JWT ${this.cookies.get("shopnow_jwt_token")}`,
                 //'Accept': 'application/json',
               }),
            body : formData,
        })
        .then(response => {
                if (response.ok) {
                    this.props.history.push('/orders');
                    return response.json();
                  } else {
                    
                    var error = new Error(response.statusText);
                    error.response = response;
                    alert(error,response.statusText);
                    throw error
                  }
            })
        .then(responseJson => {
            this.props.history.push("/");
        })
        .catch(e => {alert(e);});
    }


    render(){
        return(
            <div class="container">
              <div><br/></div>
              <div class="card-header" Style = "width:900px;margin:auto;" align = "center"><h5><b>Place Order</b></h5></div>
              <div><br/></div>
                
                {this.state.product_data.map(item => (
                    <div class="w3-container" align='center'>
                        
                          <div class="w3-card-4" Style="width:70%">
                                <header class="w3-container w3-light-grey">
                                  <h3>Order Details</h3>
                                </header>
                                <div class="w3-container" align="left">
                                    <div class="row" key={item.id}>
                                        <div class="col-sm-3">
                                            <br/>
                                            <img src={item.image} alt="Avatar" class="w3-round" Style="width:80%"/>
                                            <div class="col-sm-8" Style="margin: auto;">
                                                    <br/>
                                                    <button class="btn btn-primary btn-sm disabled" onClick={(evt) => this.decrementCart(evt, this.state.count)}>-</button>
                                                    &nbsp;&nbsp;
                                                    <label> {this.state.count} </label>
                                                    &nbsp;&nbsp;
                                                    <button class="btn btn-primary btn-sm disabled" onClick={(evt) => this.incrementCart(evt, this.state.count)}>+</button>
                                                </div>
                                        </div> 
                                        <div class="col-sm-5">
                                            <p><h3>{item.name}</h3></p>
                                            <p>Seller  :  {item.merchant.company_name}</p>
                                            <p>&#x20b9;{item.price - ((item.price/100) * item.discount)} <small class="card-subtitle text-muted"><del>&#x20b9;{item.price}</del>  {item.discount}% off </small></p>
                                            {
                                                item.stock_left <= 0 ?
                                                <div>
                                                    <p class="badge badge-warning" Style = "font-size:15px">Out Of Stock</p>
                                                    <br/>
                                                </div>
                                                
                                                :
                                                <p>Stock left : {item.stock_left}</p>
                                            }
                                            
                                        </div> 
                                        <div class="col-sm-4">
                                            <p>date : {new Date().toLocaleDateString("en-US")}</p>
                                            <p>total : &#x20b9;{(item.price - ((item.price/100) * item.discount)) * this.state.count}</p>
                                        </div> 
                                    </div>
                                    <br/>
                                </div>
                          </div>
                        <br/>
                    </div>
                ))}
                 
                <div class="w3-container" align='center'>
                        
                      <div class="w3-card-4" Style="width:70%">
                            <header class="w3-container w3-light-grey">
                              <h3>Delivery Details</h3>
                            </header>
                            <div class="w3-container" align="left">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <form onSubmit = {this.submit}>
                                            <div Style="width:300px;margin:auto;">
                                            <br/>
                                            <input onChange = {this.saveHouseno} class="form-control" type = "text" name = "houseno" placeholder = "houseno" required/>
                                            <br/> 
                                            <input onChange = {this.saveStreet} class="form-control" type = "text" name = "street" placeholder = "street" required/>
                                            <br/>
                                            <input onChange = {this.saveCity} class="form-control" type = "text" name = "city" placeholder = "city" required/>
                                            <br/>
                                            <input onChange = {this.savemystate} class="form-control" type = "text" name = "state" placeholder = "state" required/>
                                            <br/>
                                            <input onChange = {this.savePin} class="form-control" type = "text" name = "pin" placeholder = "pin" required/>
                                            <br/>
                                            <input onChange = {this.saveLandmark} class="form-control" type = "text" name = "landmark" placeholder = "landmark" required/>
                                            <br/>
                                            <div align = "center">
                                                <button type="submit" class="btn btn-primary">Order Now</button>
                                            </div>
                                        </div>
                                        </form>
                                        
                                    </div> 
                                 </div>
                                <br/>
                            </div>
                      </div>
                    
                </div>
                <br/><br/><br/><br/>
            </div>
        )
    }
}

export default PlaceOrder;