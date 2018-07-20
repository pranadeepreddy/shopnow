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
                    alert(error,response.statusText);
                    throw error
                  }
            })
        .then(responseJson => {  
            this.props.history.push("/product/" + responseJson.id);
        })
        .catch(e => {alert(e);});
    }

        render(){
            {
                
                if((this.cookies.get('shopnow_type') == 2) && (this.cookies.get('shopnow_status') == 1)){
                     return(
                         
                    <div class="container">
                    <br/>
                    <div class="w3-container" align='center'>
                          <div class="w3-card-4" Style="width:70%">
                              <div class="card-header" align = "center">
                                  <h4><b>
                                    <legend align='center'>Add Product</legend>
                                  </b></h4>
                              </div>
                              <div><br/></div>
                                <div class="w3-container" align="left">
                                    <div class="row">
                                        
                                        <div class="col-sm-12">
                                            <br/>
                                            <form onSubmit={this.submit}>
                                                <table class="table table-hover">
                                                  <tbody>
                                                    <tr>
                                                      <th scope="row">Category</th>
                                                      <td>
                                                      <input class="form-control" type = "text" id = "category" placeholder = "category" required/>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <th scope="row">Product Name</th>
                                                      <td>
                                                      <input class="form-control" type = "text" id = "name" placeholder = "product name" required/>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <th scope="row">Product Brand</th>
                                                      <td>
                                                      <input class="form-control" type = "text" id = "brand" placeholder = "product brand" required/>  
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <th scope="row">Stock Left</th>
                                                      <td>
                                                      <input class="form-control" type = "text" id = "stock_left" placeholder = "stock left" required/>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <th scope="row">Upload Image</th>
                                                      <td>
                                                      <input name="image" type="file" id="fileName" accept=".jpg,.jpeg,.png" onChange={this.saveImage} required/>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <th scope="row">Price</th>
                                                      <td>
                                                      <input class="form-control" type = "text" id = "price" placeholder = "price" required/>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <th scope="row">Discount</th>
                                                      <td>
                                                      <input class="form-control" type = "text" id = "discount" placeholder = "discount" required/>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <th scope="row">Description</th>
                                                      <td>
                                                      <textarea class="form-control" id = "description" maxlength = "512" placeholder = "product description" required/>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <th scope="row">Specification</th>
                                                      <td>
                                                      <textarea class="form-control" maxlength = "512" id = "specification" placeholder = "product specfications" required/>
                                                      </td>
                                                    </tr>   
                                                    
                                                    
                                                  </tbody>
                                                </table>
                                                <br/>
                                                <div align = "center">
                                                    <button type="submit" class="btn btn-primary" >Add Product</button>
                                                </div>
                                                <br/><br/><br/><br/>
                                             </form>
                                            
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