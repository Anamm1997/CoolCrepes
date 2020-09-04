import React from 'react';
import AddProduct from './Css/AddProduct.css'
import Fire from './Fire';
import acceptableFileTypes from './Shared/AcceptableTypes';
import { Alert } from 'reactstrap';

class AddProductPage extends React.Component {

    constructor(props){
      super(props);
      this.handleProductChange = this.handleProductChange.bind(this);
      this.handlePriceChange = this.handlePriceChange.bind(this);
      this.handleSellerChange = this.handleSellerChange.bind(this);
      this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
      this.ExtractInfo = this.ExtractInfo.bind(this);
      this.UploadImageToStorage = this.uploadImageToStorage.bind(this);
      this.handleChange = this.handleChange.bind(this);


      this.state={
        Product:"",
        Price:"",
        Seller:"",
        Description:"",
        image: "",
        uploadProduct: false,
      }
    }

    handleProductChange(e){
      this.setState({Product: e.target.value})
    }
    handlePriceChange(e){
      this.setState({Price: e.target.value})
    }
    
    handleSellerChange(e){
      this.setState({Seller: e.target.value})
    }
    handleDescriptionChange(e){
      this.setState({Description: e.target.value})
    }
    handleChange(e) {
        if(e.target.name === 'image') {
            if(!acceptableFileTypes.includes(e.target.files[0].type)) {
                this.setState({
                    image: "",
                    message: "Invalid upload, please select another image (png or jpeg)"
                });
            }
            else {
                this.setState({ image: e.target.files[0]} );
            }
        }
        else {
            this.setState({ [e.target.name] : e.target.value });
        }
    }

    async ExtractInfo(){
      let Product = this.state.Product
      let Price = this.state.Price
      let Quantity = this.state.Quantity
      let Seller = this.state.Seller
      let Description = this.state.Description
      let ImageURL = await this.uploadImageToStorage();
      console.log(Product, Price, Seller, Description)
      Fire.database().ref('product').push(
        {
          productName: Product,
          price: Price,
          seller: Seller,
          description: Description,
          imageURL: ImageURL,
           comments: []
        }
      ).then(() => {
        console.log("inserted")
          this.setState({uploadProduct : true})
      }).catch((error) => {
        console.log(error)
      })
    }

    async uploadImageToStorage() {
        if (this.state.image === "") {
            // default profile picture
            return "https://firebasestorage.googleapis.com/v0/b/coolcrepe-d97ac.appspot.com/o/productImages%2Ficon_mountain.png?alt=media&token=1c8b4dbf-e144-471a-9db7-3c32000f7b8e";
        }            
        await Fire.storage().ref(`/productImages/${this.state.email}${this.state.image.name}`).put(this.state.image);
    
        return await Fire.storage().ref('productImages').child(`${this.state.email}${this.state.image.name}`).getDownloadURL();
    }

    render() {
        return (
          <React.Fragment>
            <h1>Add Product Page</h1>
             {this.state.uploadProduct ? (<Alert color="success">
        {this.state.Product} added success, ready to be sold!
      </Alert>):""}
            <div>
              <label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Product</span>
                  </div>
                  <input type="text" className="ProductName" class="form-control" placeholder="Type Product Here" aria-label="Username" aria-describedby="basic-addon1" value={this.state.product} onChange={this.handleProductChange.bind(this)}/>
                </div>
              </label>
              <label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Price</span>
                  </div>
                  <input type="text" className = "Price" class="form-control" placeholder="Amount in USD" aria-label="Username" aria-describedby="basic-addon1" value={this.state.price} onChange={this.handlePriceChange.bind(this)}/>
                </div>
              </label>
              <label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Seller</span>
                  </div>
                  <input type="text" className = "Seller" class="form-control" placeholder="Name" aria-label="Username" aria-describedby="basic-addon1" value={this.state.seller} onChange={this.handleSellerChange.bind(this)}/>
                </div>
              </label>
              <label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">Description</span>
                </div>
                <textarea className = "Description" class="form-control" placeholder="Description of Product" aria-label="With textarea" value={this.state.description} onChange={this.handleDescriptionChange.bind(this)} ></textarea>
              </div>
              </label>
              <label>
                <div className="custom-file">
                  <input type="file" className="custom-file-input" name="image" onChange={this.handleChange} />
                  <label className="custom-file-label">Profile Picture (Optional)</label>
                </div>
              </label>
              <label><button class="btn btn-primary" onClick={()=>{ this.ExtractInfo() }}> Add </button> </label>
            </div>
          </React.Fragment>




         );
    }

}

export default AddProductPage;

