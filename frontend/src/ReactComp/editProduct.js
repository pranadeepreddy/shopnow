import React,{Component} from 'react'
import Cookies from 'universal-cookie';

class EditProduct extends Component{

    state = {
        category : '',
        name : '',
        brand : '',
        stockleft : '',
        image : '',
        price : '',
        discount : '',
        description : '',
        specification : '',
        
        product_id : null,

    };

    cookies = new Cookies();

    componentWillMount(){
        fetch(this.props.product_details_url + this.props.match.params.id + '/',{
            method:'GET',
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
            this.setState({ category : responseJson[0].category});
            this.setState({ name : responseJson[0].name});
            this.setState({ brand : responseJson[0].brand});
            this.setState({ stockleft : responseJson[0].stock_left});
            this.setState({ image : responseJson[0].image});
            this.setState({ price : responseJson[0].price});
            this.setState({ discount : responseJson[0].discount});
            this.setState({ description : responseJson[0].description});
            this.setState({ specification : responseJson[0].specification});
            this.setState({ product_id : responseJson[0].id});

        })
        .catch(e => {alert(e);});
     }

    saveCategory=(event)=>{

        const {target :{value}} = event;
        this.setState({
            category:value
        });

    }


    saveName = (event)=>{

        const {target :{value}} = event;
        this.setState({
            name:value
        });
    }

    saveBrand=(event)=>{

        const {target :{value}} = event;
        this.setState({
            brand:value
        });

    }
    
    saveStockleft=(event)=>{

        const {target :{value}} = event;
        this.setState({
            stockleft:value
        });

    }
    
    saveImage=(event)=>{

        const {target :{value}} = event;
        this.setState({
            image:value
        });

    }
    
    savePrice=(event)=>{

        const {target :{value}} = event;
        this.setState({
            price:parseFloat(value)
        });

    }
    
    saveDiscount=(event)=>{

        const {target :{value}} = event;
        this.setState({
            discount:value
        });

    }
    
    saveDescription=(event)=>{

        const {target :{value}} = event;
        this.setState({
            description:value
        });

    }
    
    saveSpecification =(event)=>{

        const {target :{value}} = event;
        this.setState({
            specification:value
        });

    }
    
    validateFileType = () =>{
        var fileName = document.getElementById("fileName").value;
        var idxDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
            this.saveImage(fileName);
        }else{
            alert("Only jpg/jpeg and png files are allowed!");
            document.getElementById("fileName").value = null;
        }   
    }
    
    
    submit = (e) =>{
        e.preventDefault();
        let formData = new FormData();
        
        formData.append("merchant" ,this.cookies.get('shopnow_id'));
        formData.append("category", this.state.category);
        formData.append("name", this.state.name);
        formData.append("brand", this.state.brand);
        formData.append("stock_left", this.state.stockleft);
        
        if(typeof document.getElementById("fileName").files[0] !== "undefined"){
            formData.append('image',document.getElementById("fileName").files[0]);
        }
            
        formData.append("price", this.state.price);
        formData.append("discount", this.state.discount,);
        formData.append("description", this.state.description);
        formData.append("specification", this.state.specification);
        
        fetch(this.props.editproduct_url + this.props.match.params.id + '/',{
            method:'PATCH',
            headers: new Headers({
                 'Authorization': `JWT ${this.cookies.get("shopnow_jwt_token")}`,
                 'Accept': 'application/json',
               }),
            body : formData,
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
            this.props.history.push('/product/' + this.state.product_id);
        })
        .catch(e => {alert (e);});
    }

        render(){
            {
                if(this.cookies.get('shopnow_type') == 2){
                     return(
                         <form onSubmit={this.submit}>
                            <div Style="width:300px;margin:auto;">
                                <br/><br/>
                                <legend  align = "center">Edit Product</legend>
                                <br/>
                                <input onChange = {this.saveCategory} class="form-control" type = "text" name = "category" value = {this.state.category} placeholder = "category" required/>
                                <br/>
                                <input onChange = {this.saveName} class="form-control" type = "text" name = "name" value = {this.state.name} placeholder = "product name" required/>
                                <br/>
                                 <input onChange = {this.saveBrand} class="form-control" type = "text" name = "brand" value = {this.state.brand} placeholder = "product brand" required/>
                                <br/>
                                 <input onChange = {this.saveStockleft} class="form-control" type = "text" name = "stock_left" value = {this.state.stockleft} placeholder = "stock left" required/>
                                <br/>
                                <input name="image" type="file" id="fileName" accept=".jpg,.jpeg,.png" onChange={this.saveImage}/>
                                <br/><br/>
                                 <input onChange = {this.savePrice} class="form-control" type = "text" name = "price" placeholder = "product price" value = {this.state.price} required/>
                                <br/>
                                 <input onChange = {this.saveDiscount} class="form-control" type = "text" name = "discount" placeholder = "discount" value = {this.state.discount} required/>
                                <br/>
                                 <textarea onChange = {this.saveDescription} class="form-control" name = "description" maxlength = "512" value = {this.state.description} placeholder = "product description" required/>
                                <br/>
                                 <textarea onChange = {this.saveSpecification} class="form-control" maxlength = "512" name = "specfications" value = {this.state.specification} placeholder = "product specfications" required/>
                                <br/>
                                <div align = "center">
                                    <button type="submit" class="btn btn-primary" >Save Changes</button>
                                </div>
                                <br/><br/><br/><br/>
                            </div>
                         </form>
                    
                    )
                }  
                else
                    return(
                        
                        <div Style="width:300px;margin:auto;">
                            <br/><br/><br/>
                            <p>No access</p>
                        </div>
                        )
            }
            

        }

}


export default EditProduct;