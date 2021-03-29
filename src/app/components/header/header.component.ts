import {Component, OnInit} from '@angular/core';
import {CartService} from "../../cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartItems: any;
  showCart: boolean;
  showText: string;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.showCart = false;

  }
  setText(): void {
    if ( ! this.showCart ) {
      this.showText = 'Show';
    }
    else { this.showText = 'Hide' ; }
  }

  getCartItems() {

    this.cartItems = this.cartService.getCart();
    this.showCart = ! this.showCart ;

    // if (this.showCart) {
    //   window.alert('Cart ' + JSON.stringify(this.cartItems, null, 1));
    // }
  }

}
