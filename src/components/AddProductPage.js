import React from 'react';
import AddProductCss from './Css/AddProduct.css'
import Fire from './Fire';

class AddProductPage extends React.Component {

    constructor(props){
      super(props);
      this.handleProductChange = this.handleProductChange.bind(this);
      this.handlePriceChange = this.handlePriceChange.bind(this);
      this.handleQuantityChange = this.handleQuantityChange.bind(this);
      this.handleSellerChange = this.handleSellerChange.bind(this);
      this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
      this.extractInfo = this.extractInfo.bind(this);


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



    extractInfo(){ //Also sends to firebase
      let Product = this.state.Product
      let Price = this.state.Price
      let Quantity = this.state.Quantity
      let Seller = this.state.Seller
      let Description = this.state.Description
      console.log(Product, Price, Quantity, Seller, Description)
      let data = {
        product: Product,
        price: Price,
        quantity: Quantity,
        seller: Seller,
        description: Description
      }
      Fire.database().ref('productTest').push(data)
      .then(() => {
        console.log(data)
      }).catch((error) => {
        console.log(error)
      })

    }


    render() {
        return (
          <React.Fragment>
            <h1>Add Product Page</h1>
            <div>
              <label>Product Name <input className="ProductName"type="text" placeholder="Type Product Here" value={this.state.product} onChange={this.handleProductChange.bind(this)} /></label>
              <label>Price <input className = "Price" type="text" placeholder="Amount in USD" value={this.state.price} onChange={this.handlePriceChange.bind(this)} /></label>
              <label>Quantity <input className = "Quantity" type="text" placeholder="Number Available" value={this.state.quantity} onChange={this.handleQuantityChange.bind(this)} /></label>
              <label>Seller <input className = "Seller" type="text" placeholder="Name" value={this.state.seller} onChange={this.handleSellerChange.bind(this)} /></label>
              <label>Description <textarea className = "Description" type="text" placeholder="Description of Product" value={this.state.description} onChange={this.handleDescriptionChange.bind(this)} /></label> {/*//textarea for multiple lines since description is going to be longer*/}
              <label><button onClick={()=>{ this.extractInfo() }}> Add </button> </label>
            </div>
          </React.Fragment>




         );
    }

}

export default AddProductPage;
