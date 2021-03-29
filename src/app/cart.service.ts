import {Injectable} from '@angular/core';
// Exporting the values from the database that are used
export interface CartItems {
  id: number;
  product_name: string;
  product_description: string;
  price: number ;
  cost: number;
  qty: number ;
}
@Injectable({
  providedIn: 'root'
})
// Initializing variables
export class CartService {
  cartItems: CartItems[] = [];
  cartCount: number;
  cartTotals = {cost: 0, qty: 0};
  constructor() {
    console.log ('In Cart');
  }
  // The getCart function retrieves each of the initialized variables

  getCart() {
    return ({cart: this.cartItems, count: this.cartCount, cartTotals: this.cartTotals});
  }

  // Create function findCart with product as the parameter
  findCart(product) {
    // Initializing productFound with a value of -1.
    let productFound = -1;
    // Initializing x with a value of 0.
    let x = 0;
    // Looping through the cartItems array, incrementing x by 1 each time
    for (x = 0; x < this.cartItems.length; x++) {
      // If an item in the cart has same product id as that which is to be added to the cart,
      // productFound variable is set to this products position in the cartItems array.
      if (this.cartItems[x].id === product.id)
        productFound = x;
    }
    return (productFound);
  }

  // Create function updateCart, with parameters of product and quantity
  updateCart(product, qty): void {
  // Creating variable idx, with value of the product found in the cartItems array.
    let idx = this.findCart(product);
    // If idx value is -1 i.e, if the product is not found in the cartItems array
    if (idx === -1) {
      // Update the cart by pushing the product to the cartItems array
      this.cartItems.push(product);
      // Set value of idx to carItems array length minus 1.
      idx = this.cartItems.length - 1;
      // Setting the quantntiy and cost of the added product to 0.
      this.cartItems[idx].qty = 0;
      this.cartItems[idx].cost = 0;
    }
    // If the product is found in the cartItems array
    // Set quantity to what was existing previously plus the new quantity
    this.cartItems[idx].qty += qty;
    // Set the cost to the quantity of that product multiplied by it's price
    this.cartItems[idx].cost = this.cartItems[idx].qty * this.cartItems[idx].price;
    // If the quantity of the product is 0 (i.e, product has been removed from cart)
    if (this.cartItems[idx].qty === 0 ) {
      // Split the array at this index (removing the index) and rejoin the array.
      this.cartItems.splice(idx, 1);
    }
    // Perform the calculateTotal function
    this.calculateTotal();
  }

  // Create the calculateTotal function
  calculateTotal(): void {
    // Setting the cartTotals cost and quantity to 0.
    this.cartTotals.cost = 0 ;
    this.cartTotals.qty = 0 ;
    // Initializing x with a value of 0.
    let x = 0;
    // Looping through the cartItems array, incrementing x by 1 each time
    for (x = 0 ; x < this.cartItems.length; x++) {
      // Total quantity in cart is set to sum of all product quantities.
      this.cartTotals.qty += this.cartItems[x].qty;
      // Total cost of cart is set to sum of all product costs.
      this.cartTotals.cost += this.cartItems[x].cost;
    }
    // Set cartCount variable to sum of all quantities of products.
    this.cartCount = this.cartTotals.qty ;
  }
}


