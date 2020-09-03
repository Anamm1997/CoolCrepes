import React from 'react';
import AddProduct from './Css/AddProduct.css'
import Fire from './Fire';

class AddProductPage extends React.Component {

    constructor(props){
      super(props);
      this.handleProductChange = this.handleProductChange.bind(this);
      this.handlePriceChange = this.handlePriceChange.bind(this);
      this.handleQuantityChange = this.handleQuantityChange.bind(this);
      this.handleSellerChange = this.handleSellerChange.bind(this);
      this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
      this.ExtractInfo = this.ExtractInfo.bind(this);

      this.state={
        Product:"",
        Price:"",
        Quantity:"",
        Seller:"",
        Description:""
      }
    }

    handleProductChange(e){
      this.setState({Product: e.target.value})
    }
    handlePriceChange(e){
      this.setState({Price: e.target.value})
    }
    handleQuantityChange(e){
      this.setState({Quantity: e.target.value})
    }
    handleSellerChange(e){
      this.setState({Seller: e.target.value})
    }
    handleDescriptionChange(e){
      this.setState({Description: e.target.value})
    }

    ExtractInfo(){
      let Product = this.state.Product
      let Price = this.state.Price
      let Quantity = this.state.Quantity
      let Seller = this.state.Seller
      let Description = this.state.Description
      console.log(Product, Price, Quantity, Seller, Description)
      Fire.database().ref('productTest').push(
        {
          product: Product,
          price: Price,
          quantity: Quantity,
          seller: Seller,
          description: Description
        }
      ).then(() => {
        console.log("inserted")
      }).catch((error) => {
        console.log(error)
      })
    }


    render() {
        return (
          <React.Fragment>
            <h1>Add Product Page</h1>
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
                    <span class="input-group-text" id="basic-addon1">Quantity</span>
                  </div>
                  <input type="text" className = "Quantity" class="form-control" placeholder="Number Available" aria-label="Username" aria-describedby="basic-addon1" value={this.state.quantity} onChange={this.handleQuantityChange.bind(this)}/>
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
              
              <label><button class="btn btn-primary" onClick={()=>{ this.ExtractInfo() }}> Add </button> </label>
            </div>
          </React.Fragment>




         );
    }

}

export default AddProductPage;

