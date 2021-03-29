import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-shop-header',
  templateUrl: './shop-header.component.html',
  styleUrls: ['./shop-header.component.css']
})
export class ShopHeaderComponent implements OnInit {
  @Input () cartCount ;
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
    if (this.showCart) {
      window.alert('Cart ' + JSON.stringify(this.cartItems, null, 1));
    }
  }
}
