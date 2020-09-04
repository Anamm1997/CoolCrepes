import React from 'react';
import Fire from '../Fire';
import acceptableFileTypes from '../Shared/AcceptableTypes';
import { Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import './AddProduct.css';

class AddProductPage extends React.Component {

    constructor(props){
      super(props);

      this.ExtractInfo = this.ExtractInfo.bind(this);
      this.UploadImageToStorage = this.uploadImageToStorage.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.toggleOptions = this.toggleOptions.bind(this);

      this.state={
        productName:"",
        price:"",
        description:"",
        image: "",
        discount: '',
        isSelling: false,
        isFeatured: false,
        stockQuantity: '',
        timeStamp: '',
        uploadProduct: false,
      }
    }

    toggleOptions(e) {
      this.setState({
        [e.target.name] : !this.state[e.target.name]
      });
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
      let ImageURL = await this.uploadImageToStorage();

      let userProductList = (await Fire.database().ref(`user/${this.props.userToken.id}/sales`).once('value')).val();
      if(!userProductList) {
        userProductList = [];
      }

      console.log(userProductList);

      let newProduct = {
        'productName': this.state.productName,
        'seller': this.props.userToken.id,
        'price': Number(this.state.price),
        'description': this.state.description,
        'discount': Number(this.state.discount),
        'isSelling': this.state.isSelling,
        'isFeatured': this.state.isFeatured,
        'stockQuantity': Number(this.state.stockQuantity),
        'timeStamp': Date.now(),
        'comments': [],
        'imageURL': ImageURL
      };

      console.log(newProduct);

      let productRef = Fire.database().ref('/product').push(newProduct, error => {
        if(error) {
          console.log(error);
        }
        else {
          console.log("inserted")
          this.setState({uploadProduct : true})
        }
      });

      userProductList.push(productRef.key);
      Fire.database().ref(`user/${this.props.userToken.id}`).update({sales: userProductList});
    }

    async uploadImageToStorage() {
        if (this.state.image === "") {
            // default profile picture
            console.log('default image');
            return "https://firebasestorage.googleapis.com/v0/b/coolcrepe-d97ac.appspot.com/o/productImages%2Ficon_mountain.png?alt=media&token=1c8b4dbf-e144-471a-9db7-3c32000f7b8e";
        }            
        await Fire.storage().ref(`/productImages/${this.state.email}${this.state.image.name}`).put(this.state.image);
    
        return await Fire.storage().ref('productImages').child(`${this.state.email}${this.state.image.name}`).getDownloadURL();
    }

    render() {
      let validProductName = this.state.productName && this.state.productName.length < 64; 
      let validPrice =  this.state.price && Number(this.state.price) > 0;
      let validDiscount = this.state.discount && Number(this.state.discount) >= 0 && Number(this.state.discount) <= 1;
      let vaildDescription = this.state.description && this.state.description.length < 256;
      let validQuantity = this.state.stockQuantity && Number(this.state.stockQuantity) > 0;

      let allowedToSubmit = validProductName && validPrice && validDiscount && validQuantity && vaildDescription && this.state.image !== '';

        return (
          <>
            {!this.props.userToken && <Redirect to="/login" />}

            <h1>Add Product Page</h1>
            {this.state.uploadProduct ? (
            <Alert color="success">
              {this.state.Product} added success, ready to be sold!
            </Alert>):""
            }
            <form className="productForm">
              <div className="form-group">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">Product</span>
                    </div>
                    <input type="text" name="productName" className="form-control" placeholder="Type Product Name Here" aria-label="productName" aria-describedby="basic-addon1" value={this.state.product} onChange={this.handleChange}/>
                  </div>
                  {!validProductName && this.state.productName !== '' && <small className="text-danger">Product Name must be less than 64 characters.</small>}
              </div>

              <div className="form-row">
                <div className="form-group col-md-4">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon2">Price</span>
                      </div>
                      <input type='number' min='0' name="price" className="form-control" placeholder="Amount in USD" aria-label="price" aria-describedby="basic-addon2" value={this.state.price} onChange={this.handleChange}/>
                    </div>
                    {!validPrice && this.state.price !== '' && <small className="text-danger">Price must be greater than $0.00.</small>}
                </div>

                <div className="form-group col-md-4">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon3">Discount</span>
                      </div>
                      <input type='number' min='0' max='1' name="discount" className="form-control" placeholder="Percent Discount" aria-label="discount" aria-describedby="basic-addon3" value={this.state.discount} onChange={this.handleChange}/>
                    </div>
                    {!validDiscount && this.state.discount !== '' &&<small className="text-danger">Discount must be between 0 and 1.</small>}
                </div>

                <div className="form-group col-md-4">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon4">Quantity</span>
                      </div>
                      <input type='number' min='0' name="stockQuantity" className="form-control" placeholder="Amount in stock" aria-label="quantity" aria-describedby="basic-addon4" value={this.state.stockQuantity} onChange={this.handleChange}/>
                    </div>
                    {!validQuantity && this.state.stockQuantity !== '' &&<small className="text-danger">Quantity must be greater than 0.</small>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon5">Start Selling</span>
                      </div>
                      <input type="radio" name="isSelling" className="form-control" aria-label="selling" aria-describedby="basic-addon5" value={this.state.isSelling} onChange={this.toggleOptions}/>
                    </div>
                </div>

                <div className="form-group col-md-6">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon6">Start Featuring</span>
                      </div>
                      <input type="radio" name="isFeatured" className="form-control" aria-label="featured" aria-describedby="basic-addon6" value={this.state.isFeatured} onChange={this.toggleOptions}/>
                    </div>
                </div>
              </div>

              <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Description</span>
                    </div>
                    <textarea name="description" className="form-control" placeholder="Description of Product" aria-label="With textarea" value={this.state.description} onChange={this.handleChange} ></textarea>
                  </div>
                  {!vaildDescription && this.state.description !== '' &&<small className="text-danger">Description must be less than 256 characters.</small>}
              </div>

              <div className="form-group">
                  <div className="custom-file justify-content-center">
                    <input type="file" className="custom-file-input" name="image" onChange={this.handleChange} />
                    <label className="custom-file-label">Product Picture</label>
                  </div>
              </div>

              <button type="submit" className="btn-lg btn-block btn-primary" disabled={!allowedToSubmit}>Add Product</button>
            </form>
          </>
         );
    }

}

export default AddProductPage;

