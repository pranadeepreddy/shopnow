import React,{Component} from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import InfiniteScroll from "react-infinite-scroll-component";
import { ScaleLoader } from 'react-spinners';



class Products extends Component{

    state = {
        result_products: [],
        page : 1,
        length : 0,
        max : 100,
        hasmore : true,
        loading: true,
    };

    cookies = new Cookies();


    saveResults = (result_products)=>{
        let temp = this.state.result_products.concat(result_products);
        this.setState({
            result_products: temp
          });
    }
    
    
    getProducts = () =>{
        if(this.state.max <= this.state.length){
            this.setState({hasmore:false});
            return;
        }
            
        let url = this.props.products_url;
        if(this.props.location.search == ""){
            url = url + "?page=" + this.state.page;
        }
        else{
            url = url + this.props.location.search + "&&page="+ this.state.page;
        }
        

        fetch(url,{
            method:'GET',
            headers: new Headers({
                 'Authentication': `JWT ${this.cookies.get("shopnow_jwt_token")}`,
                'Access-Control-Allow-Origin' : '*',
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
            this.saveResults(responseJson.results)
            this.setState({max : responseJson.count})
            this.setState(prev => ({page : prev.page + 1}));
            this.setState(prev => ({length : prev.length + responseJson.results.length}))

        })
        .catch(e => {alert(e);});
    }
    
    
    getSearchData = (searchStr) =>{
        if(searchStr == ""){
            return "";
        }
        else{
            return searchStr.substr(8)
        }
    }
    
    
    toggleLoading = (loading) =>{
        this.setState({loading});
    } 
    
    initialize = () => {
        this.setState({page : 1});
        this.setState({length : 0});
        this.setState({max : 100});
        this.setState({result_products : []})
        this.toggleLoading(true);
    }   
    
    update = async () =>{
        await this.initialize();
        this.getProducts()
    }

    componentDidUpdate(prev){
        if(prev.location.search != this.props.location.search)
        {
            this.update();
        }
    }
    
    componentWillMount(){
        this.getProducts();
     }
    
    
    
    render(){

        return(

            <div class="container">
              
              <div><br/></div>
              <div class="card-header" align = "center"><h5><b>{"Home/" + this.getSearchData(this.props.location.search)}</b></h5></div>
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
                  <InfiniteScroll
                      dataLength={this.state.length}
                      next={this.getProducts}
                      hasMore={this.state.hasmore}
                      loader={<pre align="center">Loading more products...</pre>}
                    >
                     <div class="row" Style="width : 100%;">
                      {this.state.result_products.map((item) => (
                        
                        <div class="col-sm-3">
                        <div class="card mb-3" key={item.id}>
                            <div class="card-body">
                                <Link to = {"/product/"+item.id} Style = "text-decoration: none;color: #000045;">
                                    <div>
                                        <img Style="height: 200px;max-width:100%; display: block;margin:auto;" src={item.image} alt="Card image"/>

                                            <h5 class="card-title">{item.name}</h5>
                                            <h6 class="card-subtitle text-muted">Brand  : {item.brand}</h6>
                                            <br/>
                                            <h6 class="card-subtitle text-muted">Seller  :  {item.merchant.company_name}</h6>
                                            <br/>
                                            {
                                                item.stock_left == 0 ?
                                                <p class="badge badge-warning" Style = "font-size:15px">Out Of Stock</p>
                                                :
                                                <p>Stock left : {item.stock_left}</p>
                                            }
                                            <p>&#x20b9;{item.price - ((item.price/100) * item.discount)} <small class="card-subtitle text-muted"><del>&#x20b9;{item.price}</del>  {item.discount}% off </small></p>

                                    </div>
                            
                                </Link>
                                {
                                    item.deleted === false ?
                                    <div>
                                        {
                                            (this.cookies.get('shopnow_type') == 2) ?
                                            <Link type="button" class="btn btn-primary" Style="width: 48%;" to = {"/editproduct/" + item.id} onClick={(evt) => this.props.editProduct(evt, item.id, item.merchant.id)}>Edit</Link>
                                            :
                                            <Link type="button" class="btn btn-primary" Style="width: 48%;" to = "/cart" onClick={(evt) => this.props.addToCart(evt, item.id, this.props.history)}>Add to cart</Link>
                                        }
                                        {
                                            (this.cookies.get('shopnow_type') == 2) ?
                                            <Link type="button" class="btn btn-primary" Style="width: 48%;float : right;" to = "" onClick={(evt) => this.props.deleteProduct(evt, item.id, item.merchant.id, this.props.history)}>Delete</Link>
                                            :
                                            <Link type="button" class="btn btn-primary" Style="width: 48%;float : right;" to = {item.id + "/placeorder"} >Buy Now</Link>
                                        }
                                    </div>
                                    :
                                    <span class="badge badge-danger" Style = "font-size:15px">Deleted</span>
                                }
                                
                            </div>
                          </div>
                        </div>
                        
                        
                    
                        ))}
                        </div>
                    
                    </InfiniteScroll>                    
                }
              
            </div>
        



            )

    }

}


export default Products;