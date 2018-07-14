import React,{Component} from 'react'
import Cookies from 'universal-cookie';

class AddProduct extends Component{

    state = {
        
    };

    cookies = new Cookies();
    
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
        formData.append("category", document.getElementById("category").value);
        formData.append("name", document.getElementById("name").value);
        formData.append("brand", document.getElementById("brand").value);
        formData.append("stock_left", document.getElementById("stock_left").value);
        formData.append('image',document.getElementById("fileName").files[0]);
        formData.append("price", document.getElementById("price").value);
        formData.append("discount", document.getElementById("discount").value);
        formData.append("description", document.getElementById("description").value);
        formData.append("specification", document.getElementById("specification").value);
        
        fetch(this.props.addproduct_url,{
            method:'POST',
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
                      console.log(response.statusText);
                    alert(error,response.statusText);
                    throw error
                  }
            })
        .then(responseJson => {
            console.log (responseJson);
            this.props.history.push("/product/" + responseJson.id);
        })
        .catch(e => {console.log (e);});
    }

        render(){
            {
                
                if((this.cookies.get('shopnow_type') == 2) && (this.cookies.get('shopnow_status') == 1)){
                     return(
                         <form onSubmit={this.submit}>
                            <div Style="width:300px;margin:auto;">
                                <br/><br/>
                                <legend  align = "center">Add Product</legend>
                                <br/>
                                <input class="form-control" type = "text" id = "category" placeholder = "category" required/>
                                <br/>
                                <input class="form-control" type = "text" id = "name" placeholder = "product name" required/>
                                <br/>
                                 <input class="form-control" type = "text" id = "brand" placeholder = "product brand" required/>
                                <br/>
                                 <input class="form-control" type = "text" id = "stock_left" placeholder = "stock left" required/>
                                <br/>
                                <input name="image" type="file" id="fileName" accept=".jpg,.jpeg,.png" onChange={this.saveImage} required/>
                                <br/><br/>
                                 <input class="form-control" type = "text" id = "price" placeholder = "product price" required/>
                                <br/>
                                 <input class="form-control" type = "text" id = "discount" placeholder = "discount" required/>
                                <br/>
                                 <textarea class="form-control" id = "description" maxlength = "512" placeholder = "product description" required/>
                                <br/>
                                 <textarea class="form-control" maxlength = "512" id = "specification" placeholder = "product specfications" required/>
                                <br/>
                                <div align = "center">
                                    <button type="submit" class="btn btn-primary" >Add Product</button>
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


export default AddProduct;